<template>
  <div class="userCard">
    <div class="userCard-avatar">
      <div v-if="!active" class="dot"></div>
      <img v-if="this.avatar" :src="this.avatar">
      <div class="noAvatar" v-else :class="getRandomBackgroundColor">
        <p>{{getFirstLetterOfName}}</p>
      </div>
    </div>
    <div class="userCard-name">
      <p>{{name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "userCard",
  props: {
    name: String,
    avatar: String,
    active: Boolean
  },
  methods: {},
  computed: {
    getRandomBackgroundColor() {
      const colorClass = [
        "has-background-dark",
        "has-background-link",
        "has-background-info",
        "has-background-success",
        "has-background-warning",
        "has-background-danger",
        "has-background-grey"
      ];
      const random = Math.floor(Math.random() * (6 - 0)) + 0;
      return colorClass[random];
    },
    getFirstLetterOfName() {
      const fullName = this.name.split(" ");

      if (fullName.length > 1) {
        return fullName[0].substring(0, 1) + fullName[1].substring(0, 1);
      } else {
        return fullName[0].substring(0, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.userCard {
  height: calc((100vh - 52px) / 5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fff;
  }
  .userCard-avatar {
    height: 80px;
    width: 80px;
    border-radius: 100%;

    img, .noAvatar {
      height: 100%;
      width: 100%;
      border-radius: 100%;
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
      }
    }
}
.dot {
  position: relative;
  top: 1rem;
  left: 4rem;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: green;
}
</style>
