<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/bootstrap-vue'
const authStore = useAuthStore()
import { useRouter } from 'vue-router'
// Initialize a reactive form object with nested user data and errors
const form = ref({
  user: {
    email: '',
    password: ''
  },
  errors: []
});
const router = useRouter()
async function submitlogin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    console.log(form.value.user); // Log the form data

    try {
       await authStore.login(form.value.user.email,form.value.user.password)        
        form.value.errors = [];
        router.push('/post')
    } catch (error) {
        // Handle errors
        console.error('Error submitting form:', error);
        form.value.errors = ['Error submitting form: ' + error.message];
    }
}
</script>

<template>
   <DefaultLayout>
      <div class="container">
         <div class="row">
            <div class="col-md-5 mx-auto">
               <div class="myform form">
                  <div class="logo mb-3">
                     <div class="col-md-12 text-center">
                        <h1>Login</h1>
                     </div>
                  </div>
                  <CForm @submit.prevent="submitlogin">
                     <div class="mb-3">
                        <CFormLabel for="email">Email address</CFormLabel>
                        <CFormInput
                          type="email"
                          v-model="form.user.email"
                          id="email"
                          placeholder="name@example.com"
                        />
                     </div>
                     <div class="mb-3">
                        <CFormLabel for="password">Password</CFormLabel>
                        <CFormInput
                          type="password"
                          v-model="form.user.password"
                          id="password"
                          placeholder="password"
                        />
                     </div>
                     <CButton color="success">Login</CButton>
                     <!-- Display errors -->
                     <div v-if="form.errors.length" class="alert alert-danger mt-3">
                       <ul>
                         <li v-for="(error, index) in form.errors" :key="index">{{ error }}</li>
                       </ul>
                     </div>
                  </CForm>
               </div>
            </div>
         </div>
      </div>
   </DefaultLayout>
</template>
