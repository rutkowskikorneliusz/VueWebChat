<template>
  <div class="navbar">
    <nav class="menu" role="navigation">
      <div class="centerPosition">
        <h1 @click="home">VueWebChat</h1>
      </div>
      <div class="rightPosition">
        <img :src="this.userProfile.avatar" alt="user_avatar">
        <div class="dropdownWrapper">
          <p>
            {{userProfile.name}}
            <i class="fas fa-angle-down"></i>
          </p>
          <ul class="menuDropdown">
            <li @click="showModal = true">
              <a>
                <i class="far fa-edit"></i> Edit Profile
              </a>
            </li>
            <li @click="logout">
              <a>
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <modal v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './Modal';

export default {
  name: 'navbar',
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    home() {
      this.$router.push('/');
    },
    edit() {
      this.$router.push('/edit');
    },
    logout() {
      this.$store.commit('changeUserActiveStatus', false);

      this.$store.dispatch('logoutUser').then(() => {
        this.$store.commit('setCurrentUser', null);
        this.$store.commit('setUserProfile', {});
        this.$router.push('/signin');
      });
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/var.scss";
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  height: 60px;
  border-bottom: 2px solid $grey-accent;
  @media screen and (max-width: $break-small) {
    padding: 0 1rem;
  }
  .centerPosition {
    width: 33%;
    h1 {
      font-weight: 700;
      font-size: 1.3em;
    }
  }
  .rightPosition {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      height: 48px;
      width: 48px;
      border-radius: 64px;
      margin-right: 1rem;
      @media screen and (max-width: $break-small) {
        display: none;
      }
    }

    .dropdownWrapper {
      position: relative;
      height: 60px;
      line-height: 60px;
      p {
        position: relative;
        color: $main-black;
        font-weight: 600;
      }
    }
    .dropdownWrapper:hover  > .menuDropdown {
      opacity: 1;
      display: flex;
    }
    .menuDropdown {
      transition: all 0.5s ease-in-out;
      display: none;
      opacity: 0;
      flex-direction: column;
      position: absolute;
      top: 3.5rem;
      right: 0;
      width: 100%;
      background-color: white;
      border: 1px solid $grey-accent;
      box-shadow: 10px 10px 62px -24px $main-black;
      z-index: 2;
      line-height: 30px;
      @media screen and (max-width: $break-small) {
        width: 100%;
        left:0;
        right: 0;
      }
      li {
        a {
          padding: 1rem;
          display: block;
          border-bottom: 2px solid $grey-accent;
          text-decoration: none;
          color: $main-black;
          font-weight: 600;

          &:hover {
            background-color: $grey-accent;
          }
        }
      }
    }
  }
}
</style>
