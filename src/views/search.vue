<template>
  <el-container class="search">
    <el-header class="header-search-box">
      <el-main class="header-search">
        <div style="margin: 0 auto;">
            <el-input
                v-model="keyword"
                style="width: 800px;height: 48px;border:1px solid #0fa4b3;"
                placeholder="Please input"
                class="input-with-select">
              <template #append>
                <el-button :icon="Search" @click="submitSearch" style="background-color: #0fa4b3;color: #fff;border: 1px solid #0fa4b3;" />
              </template>
              <template #prepend>
                <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                  <el-select v-model="keywordType" placeholder="期刊名称" style="width: 115px;flex: 1" size="large">
                    <el-option label="ISSN" value="issn"/>
                    <el-option label="期刊名称" value="title"/>
                    <el-option label="简介" value="abbr"/>
                    <el-option label="学科分类" value="category" />
                  </el-select>
                </div>
              </template>
            </el-input>
        </div>
        <el-row :gutter="24" style="width: 100%;justify-content: space-between; color: #000000">
          <el-col :span="5">
            <el-row :gutter="24">
              <el-col :span="9">
                <span>影响因子</span>
              </el-col>
              <el-col :span="15">
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-input @blur="effectSubmit" v-model="minEffect"/>
                  </el-col>
                  <el-col :span="4" style="padding: 0;margin: 0 auto;overflow: hidden;">
                    ——
                  </el-col>
                  <el-col :span="10">
                    <el-input @blur="effectSubmit" v-model="maxEffect"/>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row :gutter="24">
              <el-col :span="12">
                JCR分区
              </el-col>
              <el-col :span="12">
                <el-select
                    v-model="jcr"
                    size="large"
                    @change="blurSearch"
                    style="width: 80px;border: 0"
                >
                  <el-option
                      v-for="item in jcrOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row :gutter="24">
              <el-col :span="11">
                分区
              </el-col>
              <el-col :span="13">
                <el-select
                    v-model="sub"
                    size="large"
                    @change="blurSearch"
                    style="width: 80px;border: 0"
                >
                  <el-option
                      v-for="item in subOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row :gutter="24">
              <el-col :span="9">
                综述占比
              </el-col>
              <el-col :span="15">
                <el-select
                    v-model="totalReviewRatio"
                    size="large"
                    @change="blurSearch"
                    style="width: 80px;border: 0"
                >
                  <el-option
                      v-for="item in totalReviewRatioOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-header>
    <el-main class="main-search-box">
      <div class="main-search">
        <el-table
            :data="tableData"
            v-loading="load"
            :border="true">
          <el-table-column label="期刊名称" sortable width="210">
            <template #default="props">
              <div>
                <p class="hover" style="text-align: center">{{props.row.journalTitle}}</p>
                <p style="text-align: center;margin-top: 10px;color: #afafaf">{{props.row.abbrJournal}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="journalDb" label="数据库" sortable width="100" style="display: flex;justify-content: center;align-items: center;"/>
          <el-table-column prop="impactFactor_2019" label="影响因子" sortable width="100"/>
          <el-table-column prop="quote_factor" label="引文指标" sortable width="100"/>
          <el-table-column prop="jcrZone" label="JCR分区" sortable width="100" :formatter="(row, column, cellValue) => jcrFilters(cellValue)"/>
          <el-table-column prop="subZone" label="国内分区" sortable width="100" :formatter="(row, column, cellValue) => subFilters(cellValue)"/>
          <el-table-column prop="annualPublication" label="年发文量" sortable width="100"/>
          <el-table-column prop="totalReviewRatio" label="综述占比" sortable width="100" :formatter="(row, column, cellValue) => totalReviewFilters(cellValue)"/>
          <el-table-column prop="open_ratio" label="是否开源/开源占比" sortable width="175" :formatter="(row, column, cellValue) => openPercent(cellValue)"/>
          <el-table-column prop="isDomestic" label="是否国产" sortable width="100" :formatter="(row, column, cellValue) => cellValue===0?'否':'是'"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count="totalPage" style="margin:30px auto 0;"/>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { Search } from '@element-plus/icons-vue'
import Request from "../network/requestData.js";
export default {
  name:'search',
  computed: {
    Search() {
      return Search
    }
  },
  data:()=>({
    prev:null,
    paper:null,
    next:null,
    keywordType : {
      type:String,
      default:'category'
    },
    load:true,
    keyword : '',
    maxEffect : null,
    minEffect : null,
    jcr : '',
    sub : 0,
    totalReviewRatio : '',
    totalPage : 999,
    tableData : [],
    jcrOptions : [
      {
        value:0,
        label:'不限'
      },
      {
        value:8,
        label:'Q1'
      },
      {
        value:4,
        label:'Q2'
      },
      {
        value:2,
        label:'Q3'
      },
      {
        value:1,
        label:'Q4'
      }
    ],
    subOptions : [
      {
        value:0,
        label:'不限'
      },
      {
        value:1,
        label:'1区'
      },
      {
        value:2,
        label:'2区'
      },
      {
        value:3,
        label:'3区'
      },
      {
        value:4,
        label:'4区'
      }
    ],
    totalReviewRatioOptions : [
      {
        value:'all',
        label:'不限'
      },
      {
        value:1,
        label:'0%-5%'
      },
      {
        value:2,
        label:'5%-10%'
      },
      {
        value:3,
        label:'10%-20%'
      },
      {
        value:4,
        label:'20%-30%'
      },
      {
        value:5,
        label:'30%-50%'
      },
      {
        value:6,
        label:'50%以上'
      },
    ]
  }),
  methods:{
    trrl(totalReview){
      switch (totalReview){
        case 'all':return null;
        case 1: return 0
        case 2: return 5
        case 3: return 10
        case 4: return 20
        case 5: return 30
        case 6: return 50
      }
    },
    trrr(totalReview){
      switch (totalReview){
        case 'all':return null;
        case 1: return 5
        case 2: return 10
        case 3: return 20
        case 4: return 30
        case 5: return 50
        case 6: return null
      }
    },
    jcrFilters(value){
      switch (value){
        case 8:return 'Q1';
        case 4:return 'Q2';
        case 2:return 'Q3';
        case 1:return 'Q4';
      }
    },
    subFilters(value){
      switch (value){
        case 4:return '4区';
        case 3:return '3区';
        case 2:return '2区';
        case 1:return '1区';
      }
    },
    totalReviewFilters(value){
      return value+"%"
    },
    openPercent(value){
      if (value instanceof String){
        return "否"
      }else{
        return (value*100).toFixed(2)+"%"
      }
    },
    submitSearch(){
      if (this.keyword.length <= 0){
        this.$message({
          showClose: true,
          message:'搜索框不能为空',
          type:'wraning',
        })
      }else{
        this.blurSearch()
      }
    },
    blurSearch(){
      let obj = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        keywordType: this.keywordType,
        keyword:this.keyword,
        ifStart_2019:this.minEffect===null?'':this.minEffect,
        ifEnd_2019:this.maxEffect===null?'':this.maxEffect,
        ifStart:null,
        ifEnd:null,
        jcr:this.jcr===0?null:this.jcr,
        sub:this.sub===0?null:this.sub,
        selfCitingRate:'all',
        compatriotRate:'all',
        isDomestic:null,
        totalReviewRatio: this.totalReviewRatio,
        categoryId: '1e78b26454e2878930f44c6a571be497',
        recommend: 0,
        selfStart:null,
        selfEnd:null,
        numberStart:null,
        numberEnd:null,
        trrl:this.trrl(this.totalReviewRatio),
        trrr:this.trrr(this.totalReviewRatio),
        order:null,
        orderType:null
      }
      let that = this
      this.load = true
      Request.ConditionalSearch(obj,(res)=>{that.tableData = res.data.data_original.data;that.load = false})
    },
    effectSubmit(){
      if((this.maxEffect!==null&&this.minEffect===null)||(this.maxEffect===null&&this.minEffect!==null)){
        this.$message({
          showClose:true,
          message:"请输入影响因子",
          type:'wraning'
        })
      }else{
        this.blurSearch()
      }
    }
  },
  beforeCreate() {
    this.load=true
    let that = this
    Request.GetFirstData((res)=>{
      if (res.statusText === 'OK'){
        that.tableData = res.data.data_original.data
        that.totalPage = res.data.data_original.lastPage
        that.load = false
      }else{
        that.$message({
          showClose: true,
          message: '数据拉取失败，请检查网络连接',
          type: 'error',
        })
        that.load = false
      }

    })
  }
}
</script>

<style scoped>
.search{
  display: flex;
  flex-direction: column;
}
.header-search-box{
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 100%;
  height: 138px;
  -webkit-box-shadow: 0 5px 7px rgba(0, 0, 0, .1);
  box-shadow: 0 5px 7px rgba(0, 0, 0, .1);
  background-color: #fff;
}
.header-search{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 50px 14px;
}
.main-search-box{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 18px 0;
}
.main-search{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 1180px;
  background-color: #fff;
  padding: 0 20px;
  justify-content: center;
}
.cell{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100%;
}
.hover:hover{
  color: #0fa4b3;
  text-decoration: #0fa4b3 underline;
}
.hover{
  transition: ease 0.2s;
}

</style>