import _ from 'lodash'

const VuexState = {
  resetData({ state }) {
    state.data = {
      rows: [],
      pagination: {
        total: 0,
        lastPage: null,
        perPage: 10,
        prevPage: null,
        currentPage: 1,
        nextPage: null
      }
    }
  },
  putData({ state, rows = [], pagination = state.data.pagination }) {
    const totalPage = pagination.lastPage
    const currentPage = pagination.currentPage

    for (let index = 0; index < totalPage; index++) {
      const page = index + 1
      let item = state.data.rows[index] != null ? state.data.rows[index] : []
      state.data.rows[index] = page == currentPage ? rows : item
    }
    state.data.pagination = pagination
  },
  updatePagination({ state, page }) {
    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < state.data.pagination.lastPage ? page + 1 : null

    state.data.pagination.prevPage = prevPage
    state.data.pagination.currentPage = page
    state.data.pagination.nextPage = nextPage
  },
  insert: function ({ state, item }) {
    // get rows
    const rows = state.data.rows.length > 0 ? [...state.data.rows] : [[]]

    // get page
    const totalPage = state.data.rows.length
    const perPage = state.data.pagination.perPage
    const firstPage = rows[0]

    // add item to first page at first index
    firstPage.unshift(item)

    // rearrange rows
    for (let index = 0; index < totalPage; index++) {
      const currentPage = rows[index]
      if (currentPage.length > perPage) {
        // add next page (if not exist)
        const indexPage = index + 1
        if (indexPage == totalPage && currentPage.length > perPage) {
          rows[indexPage] = []
        }

        // get and remove last element 
        const lastElement = currentPage.pop()

        // add item to next page at first index
        const nextPage = rows[index + 1] ?? []
        nextPage.unshift(lastElement)
      }
    }

    // update rows
    state.data.rows = rows

    // update pagination
    const goToPage = 1
    const totalData = state.data.pagination.total + 1
    const lastPage = Math.ceil(totalData / perPage)
    const prevPage = goToPage > 1 ? goToPage - 1 : null
    const nextPage = goToPage < state.data.pagination.lastPage ? goToPage + 1 : null

    state.data.pagination = {
      total: totalData,
      lastPage: lastPage,
      perPage: perPage,
      prevPage: prevPage,
      currentPage: goToPage,
      nextPage: nextPage
    }
  },
  edit({ state, item }) {
    const _rows = state.data.rows
    const _parentItem = _rows.find(e => e.find(el => el.id == item.id))

    if (typeof _parentItem != 'undefined') {
      const _item = _parentItem.find(e => e.id == item.id)
      if (typeof _item != 'undefined') {
        _.forOwn(_item, function (value, key) {
          _item[key] = item[key] ?? _item[key]
        });
      }
    }
  },
  delete({ state, item, nextItem = null }) {
    // get rows
    const rows = state.data.rows

    // get page
    const totalPage = state.data.rows.length
    const perPage = state.data.pagination.perPage
    const indexPage = state.data.pagination.currentPage - 1
    const currentPage = rows[indexPage]
    let totalData = state.data.pagination.total

    // get index item
    const _itemIndex = currentPage.findIndex(e => e.id == item.id)

    if (_itemIndex != -1) {
      // remove item
      currentPage.splice(_itemIndex, 1);

      if (nextItem !== null) {
        // move next item to currentPage
        currentPage.push(nextItem);

        // remove nextItem
        const _nextPage = rows[indexPage + 1]
        const _nextItemIndex = _nextPage.findIndex(e => e.id == nextItem.id)
        _nextPage.splice(_nextItemIndex, 1);
      }
    }

    // rearrange rows (start from next deleted page)
    let _page = 2
    const _indexPage = state.data.pagination.currentPage

    for (let index = _indexPage; index < totalPage; index++) {
      // get next page
      const _currentPage = rows[index]
      const _netxIndexPage = index + 1
      const _nextPage = _netxIndexPage < totalPage ? rows[_netxIndexPage] : null
      let _nextItem = null

      if (_nextPage !== null) {
        if (_nextPage.length > 0) {
          _nextItem = _nextPage[0]

          const _itemLength = _netxIndexPage == totalPage - 1 ? totalData - (perPage * _page) : perPage

          if (_nextPage.length == _itemLength) {
            _currentPage.push(_nextItem);
            _nextPage.splice(0, 1);
          }
        }
      }
      _page++
    }

    // update pagination
    totalData--

    const total = totalData
    const lastPage = Math.ceil(total / perPage)
    const goToPage = state.data.pagination.currentPage > lastPage ? lastPage : state.data.pagination.currentPage
    const prevPage = goToPage > 1 ? goToPage - 1 : null
    const nextPage = goToPage < state.data.pagination.lastPage ? goToPage + 1 : null

    state.data.pagination = {
      total: total,
      lastPage: lastPage,
      perPage: perPage,
      prevPage: prevPage,
      currentPage: goToPage,
      nextPage: nextPage
    }

    // update rows
    if (rows.length > lastPage) {
      rows.splice(lastPage, 1);
    }
  },
}

export default VuexState