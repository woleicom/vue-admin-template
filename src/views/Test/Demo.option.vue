<template>
  <a-layout class='index animated fadeIn'>
    <a-card>
      <div :style="{'textAlign':'right'}">
        <a-button type="danger" @click='actionAddModel'>添加</a-button>
      </div>
      <a-form
        ref='form'
        :model='search'
        :style="{'marginBottom':'10px'}"
        :initialValues="search"
        :onFinish='pageSearchChange'
        layout='inline'
      >
        <a-form-item label="筛选项1" name='name1'>
          <a-input v-model:value="search.name1" :style="{width:'180px'}" placeholder="测试输入框"></a-input>
        </a-form-item>
        <a-form-item label="筛选项2" name='name2'>
          <a-input v-model:value="search.name2" :style="{width:'180px'}" placeholder="测试输入框"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType='submit'>搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="default" @click='pageSearchReset'>重置</a-button>
        </a-form-item>
      </a-form>
      <a-table
        :pagination='false' 
        :loading='listLoading'
        bordered
        rowKey='id' 
        :columns='columns' 
        :data-source='data'></a-table>
      <a-pagination 
        :style="{marginTop:'10px',textAlign:'right'}" 
        show-size-changer 
        show-quick-jumper
        :current="search.page" 
        :page-size="search.size" 
        :total="total" 
        @change="pageCurrentChange" 
        @showSizeChange="pageSizeChange" />
    </a-card>
    <add-modal ref='AddModal'></add-modal>
  </a-layout>
</template>
<script>
import {setPageState,getPageState} from '@/utils/pageState'
import {getList} from '@/api/demo'
import {$iscode} from '@/utils/app'
import AddModal from './AddModal.vue'
// 初始化默认筛选项数值
let defSearch = {
  name1: '',
  name2:'',
  page: 1,
  size: 10
}
export default {
  name: 'Demo',
  components: {
    AddModal
  },
  data() {
    return {
      search:{...defSearch},
      total: 0,
      listLoading:false,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          key: 'action',
          customRender: (text, record) => (
            <span>
              <a-button type="link" onClick={this.pageLinkChange} block>详情</a-button>
            </span>
          ),
        },
      ],
      data: []
    }
  },
  mounted() {
    let pageState = getPageState(this.$route.path);
    if(pageState) {
      this.search = Object.assign(this.search, pageState);
    }
    this.initData(this.search);
  },
  methods: {
    actionAddModel() {
      this.$refs['AddModal'].heandleOpen({title: '添加'}).then((res)=>{
        this.data = [res,...this.data.slice(0,-1)]
      },()=>{})
    },
    // 页面筛选项搜索
    pageSearchChange() {
      this.search = {...this.search, page: 1}
      this.initData(this.search);
    },
    // 页面筛选项重置
    pageSearchReset() {
      this.search = {...defSearch, page: this.search.page, size: this.search.size}
    },
    // 分页当前页切换
    pageCurrentChange(page, pageSize) {
      this.search.page = page;
      this.initData(this.search);
    },
    pageSizeChange(current, size) {
      this.search.size = size;
      this.initData(this.search);
    },
    // 页面跳转
    pageLinkChange() {
      setPageState(this.$route.path,{...this.search})
      this.$router.push({ path : '/demo/demo/detail' });
    },
    async initData(data) {
      this.listLoading = true;
      try {
        let res = await getList(data);
        this.listLoading = false;
        if ($iscode(res)) {
          this.data = res.data;
          this.total = res.total;
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.listLoading = false;
      }
    }
  }
}
</script>