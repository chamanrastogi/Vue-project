<script setup>
import { ref } from 'vue'
import { CButton } from '@coreui/bootstrap-vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
const counter = ref(0);
const name = ref('Vue.js')

function greet(event) {
  console.log(name);
    alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
   // alert(event.target.tagName)
  }
}
</script>

<template>

    <DefaultLayout>
        <h2>Home page</h2>
        {{ name }}
        <p>Counter <span>{{ counter }}</span></p>
        <CButton color="primary" class="me-3" @click="counter++"  shape="rounded-0">Counter plus</CButton>
        <CButton color="primary" @click="greet"  shape="rounded-0">Click Me</CButton>
    </DefaultLayout>

</template>


