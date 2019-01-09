<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div @click="close" class="cross">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <h1>Edit your personal information</h1>
              <div class="form-element">
                <figure>
                  <img
                    v-if="typeof this.userProfile.avatar == 'string' && this.userProfile.avatar != ''"
                    :src="this.userProfile.avatar"
                    @click="changeAvatarTrigger"
                    alt="avatar"
                  >
                  <img
                    v-if="this.userProfile.avatarPreview"
                    :src="this.userProfile.avatarPreview"
                    @click="changeAvatarTrigger"
                    alt="avatarPreview"
                  >
                  <div @click="changeAvatarTrigger" class="uploadZone">
                    <input type="file" ref="uploadAvatar" @change="handleAvatarUpload">
                    <p>Click to upload avatar</p>
                  </div>
                </figure>
              </div>
              <div class="form-element">
                <input type="text" v-model="userProfile.name" placeholder="Full name">
                <label for>Full name</label>
              </div>
              <div class="form-element">
                <input type="text" v-model="userProfile.workplace" placeholder="Role in company">
                <label>Role in company</label>
              </div>
              <div class="form-element">
                <input type="text" v-model="userProfile.city" placeholder="City">
                <label>City</label>
              </div>
              <div class="form-element">
                <input type="date" v-model="userProfile.birthday" placeholder="Birthday">
                <label>Birthday</label>
              </div>
              <div class="form-element">
                <input type="tel" v-model="userProfile.phone" placeholder="Phone">
                <label>Phone</label>
              </div>

              <div class="form-element">
                <input @click="updateProfile" type="submit" value="Save it!">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'modal',
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    close() {
      this.$store.dispatch('fetchUserProfile');
      this.$emit('close');
    },
    updateProfile() {
      this.$store.dispatch('updateUserProfile', this.userProfile).then(() => {
        this.$store.dispatch('fetchUserProfile');
        this.$emit('close');
        this.$toasted.show('Profile has been updated', { position: 'top-center', duration: 5000 });
      }).catch((err) => {
        this.$toasted.show(err, { position: 'top-center', duration: 5000, action: { text: 'OK' } });
      });
    },
    changeAvatarTrigger() {
      this.$refs.uploadAvatar.click();
    },
    handleAvatarUpload() {
      const file = this.$refs.uploadAvatar.files[0];
      this.userProfile.avatar = file;
      this.userProfile.avatarPreview = URL.createObjectURL(file);
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/var.scss";
.cross {
  position: relative;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  span {
    display: block;
    width: 3px;
    height: 30px;
    background: #000;
    position: absolute;
    top: -2rem;
    right: -1rem;
    &:nth-child(1) {
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      transform: rotate(-45deg);
    }
  }
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: flex;
  justify-content: center;

  @media screen and (max-width: $break-small) {
    overflow-y: scroll;
    height: 100vh;
  }
}

.modal-container {
  padding: 3rem 3rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  @media screen and (max-width: $break-small) {
    overflow-y: scroll;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    figure {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 128px;
      width: 128px;
      margin: 0 auto;

      img {
        width: 128px;
        height: 128px;
        border-radius: 128px;
        z-index: 2;
      }
      .uploadZone {
        position: absolute;
        width: 126px;
        height: 126px;
        border: 2px dashed $main-black;
        border-radius: 126px;
        line-height: 126px;
        text-align: center;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        input[type="file"] {
          height: 100%;
          width: 100%;
          outline: none;
          opacity: 0;
          z-index: 1;
        }
        p {
          position: absolute;
          top: 0;
        }
      }
    }
    h1 {
      font-weight: 500;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
