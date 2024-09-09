<script setup>

import DefaultLayout from '../components/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <CButton color="success" @click="addPost()">Add Post</CButton>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">User Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow id="post-{{ item.id }}" v-for="item in items" :key="item.id">
          <CTableHeaderCell scope="row">{{ item.id }}</CTableHeaderCell>
          <CTableDataCell>{{ item.userId }}</CTableDataCell>
          <CTableDataCell>{{ item.title }}</CTableDataCell>
          <CTableDataCell>
            <div class="d-grid gap-2 d-md-flex">
              <CButton color="warning" @click="getPost(item.id)">View</CButton>
              <CButton color="info" @click="editPost(item.id)">Edit</CButton>
              <CButton color="danger" @click="deletePost(item.id)">Delete</CButton>
            </div>

          </CTableDataCell>
        </CTableRow>

      </CTableBody>
    </CTable>
    <CModal backdrop="static" :visible="visibleStaticBackdropDemo" @close="() => { visibleStaticBackdropDemo = false }">
      <CModalHeader>
        <CModalTitle>{{ post.title }}</CModalTitle>
      </CModalHeader>
      <CModalBody>{{ post.body }}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleStaticBackdropDemo = false }">
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>

    <CModal backdrop="static" :visible="visibleStaticBackdropEdit" @close="() => { visibleStaticBackdropEdit = false }">
      <CModalHeader>
        <CModalTitle>Edit {{ post.title }}</CModalTitle>
      </CModalHeader>
      <CModalBody> Edit Form Data</CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleStaticBackdropEdit = false }">
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>


    <CModal backdrop="static" :visible="visibleStaticBackdropAdd" @close="() => { visibleStaticBackdropAdd = false }">
      <CModalHeader>
        <CModalTitle>Add Post</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div class="mb-3">
            <CFormLabel for="exampleFormControlInput1">Title</CFormLabel>
            <CFormInput type="text" placeholder="Title" />
          </div>
          <div class="mb-3">
            <CFormLabel for="exampleFormControlTextarea1">Body</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleStaticBackdropAdd = false }">
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </DefaultLayout>
</template>

<script>
import axios from 'axios';

import { CTable, CTableRow, CTableHead, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/bootstrap-vue';

import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/bootstrap-vue';

import { CForm, CFormLabel, CFormInput, CFormTextarea } from '@coreui/bootstrap-vue';
export default {
  components: {

  },
  data() {
    return {
      id: 1,
      visibleStaticBackdropDemo: false,
      visibleStaticBackdropEdit: false,
      visibleStaticBackdropAdd: false,
      items: [],
      post: [],
      newPost: {
        title: '',
        body: ''
      }
    };
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://tempo.test/api/posts');
        this.items = response.data;
      } catch (err) {
        this.error = 'Error fetching data: ' + err.message;
        console.error(err);
      }
    },
    addPost() {
      this.visibleStaticBackdropAdd = !this.visibleStaticBackdropAdd;
      console.log(this.newPost)
    },
    editPost(id) {
      console.log(id);
      this.visibleStaticBackdropEdit = !this.visibleStaticBackdropEdit;
    },
    deletePost(id) {
      console.log(id)
      this.id = id;
      axios
        .delete('http://tempo.test/api/posts/' + this.id)
        .then(response => {
          this.loadData();
          console.log(response);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getPost(id) {
      this.visibleStaticBackdropDemo = !this.visibleStaticBackdropDemo;
      this.id = id;
      axios
        .get('http://tempo.test/api/posts/' + this.id)
        .then(response => {
          this.post = response.data;
          // console.log(this.post);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  },
  mounted() {
    this.loadData();

  }
};
</script>
