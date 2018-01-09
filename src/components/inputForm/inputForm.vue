<template>
		<div>
				<input :type="type" maxlength="600" :name="id" :id="id" v-model='formModel' />
		</div>
</template>
<style scoped>
		div {
				display: inline;
		}
		
		div input {
				width: calc(100% - 70px);
				height: 36px;
				float: left;
				background: #ffffff;
				border: 1px solid #c8c8c8;
				border-radius: 6px;
				box-sizing: border-box;
				margin: 5px 0 0 8px;
				padding: 0 5px;
		}
</style>
<script>
		import vuex from './store.js'
		
		export default {
				props: {
						id: String,
						type: {
								type: String,
								default: 'text'
						}
				},
				computed: {
						formModel: {
								get() {
										return this.form[this.id]
								},
								set(val) {
										this.update(val)
								}
						}
				},
				vuex: {
						getters: {
								form: state => state.form
						},
						actions: {
								update({dispatch, state}, val) {
										dispatch('UPDATE_FORM', this.id, val)
								}
						}
				}
		}
</script>