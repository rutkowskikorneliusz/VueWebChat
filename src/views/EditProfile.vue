<template>
  <section class="hero is-link is-fullheight is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-2">Edit your profile</h1>
        <nav class="level">
          <div class="level-item">
            <div class="box">
              <form @submit.prevent>
                <div class="is-fullwidth">
                  <figure class="image avatar container is-128x128" v-if="this.userProfile.avatarPreview">
                    <img class="is-rounded " :src="this.userProfile.avatarPreview" alt="avatar">
                  </figure>
                  <b-field v-else>
                    <b-upload v-model="userProfile.avatar" drag-drop >
                      <section class="section">
                        <div class="content has-text-centered">
                          <p>Upload avatar</p>
                        </div>
                      </section>
                    </b-upload>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="userProfile.name"
                      size="is-medium"
                      placeholder="Name and surname"
                      type="text"
                      icon-pack="fas"
                      icon="user"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="userProfile.workplace"
                      size="is-medium"
                      placeholder="Workplace"
                      type="text"
                      icon-pack="fas"
                      icon="briefcase"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="userProfile.city"
                      size="is-medium"
                      placeholder="City"
                      type="text"
                      icon-pack="fas"
                      icon="map-marker-alt"
                    ></b-input>
                  </b-field>
                  <b-field>
                    <b-datepicker
                      v-model="userProfile.birthday"
                      placeholder="Birthday"
                      size="is-medium"
                      icon-pack="fas"
                      icon="calendar-alt"
                      :date-formatter="dateFormatter"
                    ></b-datepicker>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="userProfile.phone"
                      size="is-medium"
                      placeholder="Phone number"
                      type="text"
                      icon-pack="fas"
                      icon="mobile-alt"
                    ></b-input>
                  </b-field>
                  <div class="control">
                    <button
                      @click="updateProfile"
                      class="button is-link is-medium is-outlined is-fullwidth"
                    >Save It!</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
const fb = require("../firebaseConfig.js");
const moment = require('moment');
import { mapState } from "vuex";

export default {
  name: "editProfile",
  date: function() {
    return {
      userProfile: {
        avatar: "",
        avatarPreview: "",
        name: "",
        workplace: "",
        city: "",
        birthday: Date,
        phone: ""
      }
    };
  },
  methods: {
    dateFormatter(dt) {
      let date = moment(dt).format('YYYY-MM-DD');
      return date;
    },
    updateProfile() {
        this.$store.dispatch('updateUserProfile',this.userProfile);
    }
  },
  watch: {
    userProfile: {
      handler(file) {
        if (file.avatar) {
          this.userProfile.avatarPreview = URL.createObjectURL(file.avatar);
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["userProfile"]),
    
  },
};
</script>

<style lang="scss">
.upload .upload-draggable {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.avatar {
    margin-bottom: 1rem !important;
}
</style>
