<template>
  <div class="container">
    <h1 class="title">mcsoc-chatbox-demo</h1>

    <div class="chat-container">
      <div class="chat-message-container" id="chat-message-container">
        <MessageItem
          v-for="(msg, inx) in messageList"
          :key="inx"
          :side="msg.owner ? 'right' : 'left'"
          :data="msg"
        ></MessageItem>
      </div>

      <div class="chat-input-container">
        <textarea type="text" v-model="messageInput"></textarea>
        <b-button @click="SendOnClick">send</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MessageItem from "@/components/MessageItem.vue";
export default {
  middleware: "auth",
  components: {
    MessageItem
  },
  data() {
    return {
      messageList: [],
      messageInput: ""
    };
  },
  async mounted() {
    await this.getAllMessage();

    let _this = this;

    await this.$fire.database.ref("msg").on(
      "value",
      async function(snapshot) {
        console.log(snapshot);
        await _this.getNewMessage();

        var container = _this.$el.querySelector("#chat-message-container");
        container.scrollTop = container.scrollHeight;
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    // this.$fire.database.ref("msg").once("value")
  },
  methods: {
    async SendOnClick() {
      if (this.messageInput === "") return;

      try {
        let response = await this.$axios.post("/chat/send", {
          message: this.messageInput,
          user_id: this.$nuxt.$auth.user.id
        });

        var msgObj = {
          last_updated: Date.now()
        };

        await this.$fire.database.ref("msg").set(msgObj);

        this.messageInput = "";
      } catch (error) {
        console.log(error);
      }
    },
    dateTimeFormat(dt) {
      return (
        dt
          .getDate()
          .toString()
          .padStart(2, "0") +
        "/" +
        (dt.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        dt.getFullYear().toString() +
        " " +
        dt
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        dt
          .getMinutes()
          .toString()
          .padStart(2, "0")
      );
    },
    async getAllMessage() {
      let response = await this.$axios.get("/chat/list");
      console.log(response);

      this.messageList = [];
      response.data.data.map(item => {
        let dt = new Date(item.created_on);
        this.messageList.push({
          id: item.id,
          message: item.message,
          dateTime: this.dateTimeFormat(dt),
          owner: item.users_id == this.$nuxt.$auth.user.id
        });
      });

      var container = this.$el.querySelector("#chat-message-container");
      container.scrollTop = container.scrollHeight;
    },
    async getNewMessage() {
      let tfMessageList = this.messageList.map(item => parseInt(item.id));
      console.log(tfMessageList);
      let maxId = Math.max(...tfMessageList);
      let response = await this.$axios.get("/chat/newMessage/" + maxId);
      console.log(response);

      response.data.data.map(item => {
        let ft = this.messageList.filter(msg => msg.id == item.id);
        let dt = new Date(item.created_on);

        if (ft.length == 0) {
          this.messageList.push({
            id: item.id,
            message: item.message,
            dateTime: this.dateTimeFormat(dt),
            owner: item.users_id == this.$nuxt.$auth.user.id
          });
        }
      });
    }
  }
};
</script>

<style>
body {
  background-color: lightgray;
}
.container {
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.chat-container {
  width: 500px;
  border: 1px solid black;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
}
.message-container > div {
  display: inline-block;
}

.chat-message-container {
  height: 600px;
  overflow-y: scroll;
}

.chat-input-container {
  padding-top: 10px;
}

.chat-input-container textarea {
  width: 400px;
}

.chat-input-container button {
  vertical-align: top;
}

.message-container {
  margin-bottom: 8px;
}

.message-container .message {
  background-color: #35495e;
  padding: 8px 12px;
  width: auto;
  min-width: 0px;
  color: white;
  display: inline-block;
}
.message-container.message-left .message {
  border-radius: 14px 14px 14px 0px;
}
.message-container.message-right {
  text-align: right;
}
.message-container.message-right .message {
  border-radius: 14px 14px 0px 14px;
}
.message-container .img-user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  display: inline-block;
  vertical-align: top;
}
.message-timestamp {
  font-size: 9px;
  font-style: italic;
}
</style>
