<template>
  <div id="receiverProfile">
    <img :src="receiverUserProfile.avatar" alt="avatar">
    <h1>{{receiverUserProfile.name}}</h1>
    <h2>{{receiverUserProfile.workplace}}</h2>
    <p>
      <i class="fas fa-map-marker-alt"></i>
      {{receiverUserProfile.city}}
    </p>
    <p>
      <i class="fas fa-birthday-cake"></i>
      {{makeDateReadable}}
    </p>
    <p>
      <i class="fas fa-mobile-alt"></i>
      {{receiverUserProfile.phone}}
    </p>
  </div>
</template>
<script>
import { mapState } from 'vuex';

const moment = require('moment');

export default {
  name: 'receiverProfile',
  computed: {
    ...mapState(['receiverUserProfile']),
    makeDateReadable() {
      const data = moment(this.receiverUserProfile.birthday).format(
        'Do MMM YYYY',
      );
      return data;
    },
  },
};
</script>

<style lang="scss" >
@import "../assets/var.scss";

#receiverProfile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  height: 100%;
  color: $grey-accent;
  img {
    width: 180px;
    border-radius: 100%;
    padding: 0 0 1rem 0;
  }
  h1 {
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
  }
  h2 {
    font-size: 1.2em;
    font-weight: 300;
    font-style: italic;
    line-height: 1.2;
  }
  p {
    padding: 0 1rem;
    width: 100%;
    font-size: 1.1em;
    font-weight: 300;
    margin-top: 1rem;
    svg {
      font-size: 1.2em;
      margin-right: 1rem;
    }
  }
}
#sendedImage {
  h2 {
    font-weight: 400;
    font-style: normal;
    text-align: center;
    padding: 1rem 0;
  }
  .imageContainer {
    display: grid;
    grid-template-columns: 10vw 10vw;
    grid-template-rows: 10vw 10vw;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    overflow-y: scroll;

    img {
      width: 90%;
      border-radius: 0;
      place-self: center;
    }
  }
}
</style>
