<template>
  <div class="userCard" v-scroll-to="'#messageList'">
    <div class="userCard-avatar">
      <div class="dot" :class="{ isActive : active}"></div>
      <img v-if="this.avatar" :src="this.avatar">
      <div class="noAvatar" v-else>
        <p>{{getFirstLetterOfName}}</p>
      </div>
    </div>
    <div class="userCard-name">
      <p>{{name}}</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'userCard',
  props: {
    id: String,
    name: String,
    avatar: String,
    active: Boolean,
  },
  computed: {
    ...mapState(['receiverUser']),
    getFirstLetterOfName() {
      const fullName = this.name.split(' ');

      if (fullName.length > 1) {
        return fullName[0].substring(0, 1) + fullName[1].substring(0, 1);
      }
      return fullName[0].substring(0, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/var.scss";

.isActive {
  opacity: 1 !important;
}
.userCard {
  height: calc((100vh - 52px) / 5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: $break-small) {
    height: 100%;
  }
  &:hover {
    background-color: #fff;

    @media screen and (max-width: $break-small) {
      background: transparent;
    }
  }
  .userCard-avatar {
    height: 80px;
    width: 80px;
    border-radius: 100%;
    margin-bottom: 8px;
    img,
    .noAvatar {
      height: 80px;
      width: 80px;
      border-radius: 80px;
      background: $main-color;
    }
    .noAvatar {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: #fff;
        font-size: 1.4em;
        font-weight: bold;
      }
    }
  }
  .userCard-name {
    padding: 1rem 0;
    p {
      color: #232323;
      font-weight: bold;
      text-align: center;
    }
  }
}
.dot {
  opacity: 0;
  position: relative;
  top: 1rem;
  left: 4rem;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: green;
  transition: all 0.3s ease-in-out;
}
</style>
