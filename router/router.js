/**
 * 路由跳转封装
 */

class Router {
  /**
   * 保留当前页面,跳转到应用内的某个页面
   * @param {string} url 页面路径 
   * @param {object} params 页面参数
   */
  push(url, params = {}) {
    const query = params ? Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&') : '';
    uni.navigateTo({
      url: query ? `${url}?${query}` : url
    })
  }

  /**
   * 关闭当前页面,跳转到应用内的某个页面
   * @param {string} url 页面路径
   * @param {object} params 页面参数 
   */
  replace(url, params = {}) {
    const query = params ? Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&') : '';
    uni.redirectTo({
      url: query ? `${url}?${query}` : url
    })
  }

  /**
   * 关闭所有页面,打开到应用内的某个页面
   * @param {string} url 页面路径
   * @param {object} params 页面参数
   */
  replaceAll(url, params = {}) {
    const query = params ? Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&') : '';
    uni.reLaunch({
      url: query ? `${url}?${query}` : url
    })
  }

  /**
   * 跳转到 tabBar 页面,并关闭其他所有非 tabBar 页面
   * @param {string} url tabBar页面路径
   */
  pushTab(url) {
    uni.switchTab({
      url
    })
  }

  /**
   * 关闭当前页面,返回上一页面或多级页面
   * @param {number} delta 返回的页面数,如果 delta 大于现有页面数,则返回到首页
   */
  back(delta = 1) {
    uni.navigateBack({
      delta
    })
  }
}

export default new Router()
