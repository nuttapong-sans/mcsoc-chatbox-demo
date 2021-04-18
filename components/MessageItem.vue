<template>
    <div :class="'message-container message-'+$props.side">
      <img src="~assets/man.png" class="img-user" v-if="$props.side=='left'"/>
      <div>
        <div class="message">
          {{data.message}}
        </div>
        <div class="message-timestamp">
          {{data.dateTime}}
        </div>
      </div>
      <img src="~assets/woman.png" class="img-user" v-if="$props.side=='right'"/>
    </div>
</template>

<script>
export default {
    props: {
        side: {
            type: String,
            default: 'left'
        },
        data:{
            type:Object,
            default: {
                message:"",
                dateTime:""
            }
        }
    },
};
</script>

<style></style>
