<template>
  <div class="filter">
    <div>
      <label for="selectGender" class="textfield__label__text">Género</label>
      <select name="select" id="selectGender" class="filter__select" v-on:change="genderChanged">
        <option value="female" selected>Mujer</option>
        <option value="male">Hombre</option>
        <option value="both">Ambas</option>
      </select>
    </div>
    <div>
      <label for="selectResults" class="textfield__label__text"
        >Nº de resultados</label
      >
      <select name="select" id="selectResults" class="filter__select" v-on:change="resultsChanged">
        <option value="3">3</option>
        <option value="6" selected>6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
    name: "UsersFilter",
    methods: {
        genderChanged() {
          this.$emit("gender", document.getElementById("selectGender").value);
        },
        resultsChanged() {
          this.$emit("results", document.getElementById("selectResults").value);
        }
    }
};
</script>

<style lang="scss" scoped>
.filter {
  background-color: $white;
  height: 50px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
  padding: 10px;

  &__select {
    border-top: none;
    border-left: none;
    border-bottom: 1 px solid $black;
    border-right: none;
    margin-top: 20px;
    appearance: none;
    width: 75px;
    margin-left: 10px;
    margin-right: 10px;

    &:focus {
      outline: 0;
      border-bottom: 1px solid $blue-primary;
    }
  }
}
</style>