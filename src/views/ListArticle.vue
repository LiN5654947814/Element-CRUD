<template>
  <div>
    <el-table :data="article">
      <el-table-column prop="title"
                       label="标题"
                       width="140">
      </el-table-column>
      <el-table-column prop="desc"
                       label="内容"
                       :span="20">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      article: []
    }
  },
  methods: {
    edit (id) {
      this.$router.push(`/articles/${id}/edit`)
    },
    remove (id) {
      this.$axios.delete(`/articles/${id}`).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getArcticle()
      })
    },
    getArcticle () {
      this.$axios.get('articles').then((res) => {
        this.article = res.data
      })
    }
  },
  created () {
    this.getArcticle()
  }
}
</script>
<style scoped>
.el-table-column {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
