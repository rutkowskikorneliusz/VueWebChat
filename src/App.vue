<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700");
@import "assets/var.scss";

* {
  &::-webkit-scrollbar {
    width: 0px; /* remove scrollbar space */
    background: transparent;
  }
}
*,
body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Open Sans", sans-serif;
}
ul {
  list-style-type: none;
}
#app {
  border: 1px solid $grey-accent;
  margin: 0 auto;
}
.columns {
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  @media screen and (max-width: $break-medium) {
    flex-direction: column;
  }
}
.isError {
  color: $error-color;
  input {
    border-bottom-color: $error-color !important;
    caret-color: $error-color;
    &::placeholder {
      color: $error-color;
    }
  }
}
.slug {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 33vw;
  background-color: $main-color;
  text-align: center;
  padding: 1rem;
  color: #fff;
  @media screen and (max-width: $break-medium) {
    width: 100vw;
    padding: 4rem 2rem;
    height: auto;
  }
  &::after {
    content: "";
    z-index: 0;
    width: 100%;
    height: 250px;
    transform: rotate(-5deg);
    background-image: url(assets/people_ilustration.png);
    background-position: 50% 100%;
    background-size: 300px;
    background-repeat: no-repeat;
  }

  h1 {
    font-size: 2.5em;
    font-weight: 700;
    line-height: 1.8;
  }
  p {
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.2;
  }
}
.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66vw;
  padding: 1rem;
  @media screen and (max-width: $break-medium) {
    width: 100vw;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-weight: 500;
    }
  }
}
.form-element {
  width: 300px;
  position: relative;
  padding: 1rem 0;
  label {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    font-weight: 700;
    font-size: 0.8em;
    transition: all 0.25s ease-in-out;
  }
  input:not([type="submit"]) {
    width: 100%;
    height: 50px;
    outline: 0;
    border: none;
    border-bottom: 1px solid $main-black;
    font-size: 1.2em;
    transition: all 0.25s ease-in-out;

    &:not(:placeholder-shown) {
      & + label {
        opacity: 1;
      }
    }
    &:focus {
      border-bottom-width: 2px;
      & + label {
        opacity: 1;
      }
      &::placeholder {
        opacity: 0;
      }
    }
  }
  input[type="submit"] {
    border: none;
    width: 100%;
    height: 50px;
    background: $main-color;
    transition: all 0.25s ease-in-out;
    font-size: 1.2em;
    color: #fff;
    text-transform: uppercase;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}
.form-options {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a,
  span {
    color: $main-black;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 400;
    transition: all 0.25s ease-in-out;

    &:hover {
      color: $main-color;
      cursor: pointer;
    }
  }
}
</style>
