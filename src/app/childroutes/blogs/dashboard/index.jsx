import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import { Link } from 'react-router'

import * as blogActions from '../actions/blog'

import Item from './item'

import styles from './styles/index.scss'

@connect(state => ({
  blogs: state.blogs
}), dispatch => ({
  ...bindActionCreators(blogActions, dispatch)
}))
export default class Blogs extends Component {

  static propTypes = {
    blogs: PropTypes.array.isRequired,
    fetchBlogs: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  componentDidMount () {
    this.props.fetchBlogs({})
  }

  render () {
    let { deleteBlog } = this.props
    return (
      <div className={styles.ns}>
        <header className={styles.header}>
          Blogs:
          <Link to="/blogs/add">Add New</Link>
        </header>
        <section className={styles.blogs}>
          {
            this.props.blogs.map(
              blog => <Item key={blog.id} { ...blog } deleteBlog={deleteBlog} />
            )
          }
        </section>
      </div>
    )
  }

}
