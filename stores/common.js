export const useCommonStore = defineStore('common', {
  state: () => ({ isLoading: false }),
  actions: {
    setLoadingStatus(isLoading) {
      this.isLoading = isLoading
    }
  }
})
