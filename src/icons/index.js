import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件
import generateIconsView from './generateIconsView.js'// just for @/views/icons , you can delete it

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const siderbar = require.context('./siderbar', false, /\.svg$/)
const navbar = require.context('./navbar', false, /\.svg$/)
const login = require.context('./login', false, /\.svg$/)
const title = require.context('./title', false, /\.svg$/)
const iconMap = requireAll(req).concat(requireAll(siderbar), requireAll(navbar), requireAll(login), requireAll(title))

generateIconsView.generate(iconMap) // just for @/views/icons , you can delete it
