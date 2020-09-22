<template>
  <a-layout class='index animated fadeIn'>
    {{t('welcome')}}
     <a-datePicker :style="{width:'200px', marginBottom: '20px'}"/>
     <div :style='{width:"300px",background:"#ffffff",padding:"20px"}'>
       <a-form >
        <a-form-item label="name" v-bind="validateInfos.name">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="deep name" v-bind="validateInfos['deep.name']">
          <a-input v-model:value="modelRef.deep.name" />
        </a-form-item>
        <a-form-item class="error-infos" >
          <a-button type="primary" @click="onSubmit">
            Create
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetFields">
            Reset
          </a-button>
        </a-form-item>
      </a-form>
     </div>
  </a-layout>
</template>

<script>
import t from '../lang/t'
import { reactive, toRaw, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
export default {
  name: 'Home',
  setup() {
    const modelRef = reactive({
      name: '',
      deep: {
        name: ''
      }
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      'deep.name': [
        {
          required: true,
          message: 'Please input deep name',
        },
      ],
    });
    const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef, {deep: true});
    const onSubmit = e => {
      e.preventDefault();
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    return {
      t,
      modelRef,
      validateInfos,
      resetFields,
      onSubmit,
    }
  }
}
</script>
