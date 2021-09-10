import Vue from 'vue'
import Vuex from 'vuex'
import RepositoryFactory from '@/repositories/RepositoryFactory'
import axios from 'axios'

const UserRepository = RepositoryFactory.get('user')
const GroupRepository = RepositoryFactory.get('group')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    limitPost: 1,// LIMIT NUMBER OF POST TO COMMENT
    groupPost: [],// POST OF SELECTED GROUP
    contentText: [''],
    tagList: [],
    attachment: [],
    attachmentData: {},
    groups: [],//SELECTED GROUP FOR SPAM COMMENT
    groupsList: [],
    timeDelay: 5,
    randomImage: false,
    randomLink: false,
    randomStream: false,
    randomFile: false,
    choiceTime: 'range',
    minTime: 5,
    maxTime: 10,
    regime: 'regime_text'
  },

  getters: {
  },

  mutations: {
    set_limit_post: (state, data) => {
      state.limitPost = data;
    },

    set_tag_list: (state, data) => {
      state.tagList = data
    },
    set_content: (state, content) => {
      state.contentText = content
    },

    set_attachment: (state, content) => {
      state.attachment = content
    },
    set_group_post: (state, data) => {
      state.groupPost = data
    },
    set_attachment_data: (state, data) => {
      state.attachmentData = data
      console.log("Attachment Data: ", state.attachmentData);
    },
    set_groups: (state, group) => {
      state.groups = group
    },
    list_groups: (state, groups) => {
      state.groupsList = groups
    },
    set_time_delay: (state, time) => {
      state.timeDelay = time
    },
    set_random_image: (state, random) => {
      state.randomImage = true
    },
    set_random_link: (state, random) => {
      state.randomLink = random
    },
    set_random_stream: (state, random) => {
      state.randomStream = random
    },
    set_random_file: (state, random) => {
      state.randomFile = random
    },
    set_choice_time: (state, choiceTime) => {
      state.choiceTime = choiceTime
    },
    set_min_time: (state, minTime) => {
      state.minTime = minTime
    },
    set_max_time: (state, maxTime) => {
      state.maxTime = maxTime
    },
    set_regime: (state, regime) => {
      state.regime = regime
    },
  },

  actions: {
    userProfile: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        resolve(UserRepository.get())
      })
    },
    // GET ALL GROUP
    listGroup: ({ commit, dispatch }, token) => {
      return new Promise(async (resolve, reject) => {
        const pages = await GroupRepository.get(token)
        commit('list_groups', pages.data)
        resolve(pages)
      })
    },
    // GET POST OF GROUP
    getGroupPost: ({ commit, dispatch }, params) => {
      return new Promise(async (resolve, reject) => {
        const post = await GroupRepository.getPost(params)

        // commit('set_group_post', pages.data)
        resolve(post)
      })
    },
    // Comment
    comment: ({ commit, dispatch }, params) => {
      return new Promise(async (resolve, reject) => {
        console.log("Comment params:", params);
        const response = await GroupRepository.comment(params)
        // console.log("COMMENT RESPONSE:", comment_link);
        // commit('set_group_post', pages.data)
         resolve(response.data)
      })
    },
    //  Create new post in a group
    postGroup: ({ commit, dispatch }, data) => {
      return new Promise(async (resolve, reject) => {
        const groups = await GroupRepository.post(data)
        resolve(groups.data)
      })
    },

  },
})
