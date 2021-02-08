import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {withPrefix, getData, htmlToReact, getPages} from '../utils';
import PostNavItem from '../components/PostNavItem';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        let posts_all = getPages(this.props.pageContext.pages, '/blog');
        let posts_sorted = _.orderBy(posts_all, 'frontmatter.date', 'desc');
        let post_item_len = _.size(posts_sorted);
        return (
            <Layout {...this.props}>
            <article className="post">
              <div className="container container--md">
                {_.get(this.props, 'pageContext.frontmatter.image', null) && (
                <div className="post__image">
                  <img src={withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null))} alt={_.get(this.props, 'pageContext.frontmatter.image_alt', null)} />
                </div>
                )}
                <header className="post__header">
                  <h1 className="post__title">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                  <div className="post__meta">
                    <span>On <time dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%B %d, %Y')}</time></span>
                    {_.get(this.props, 'pageContext.frontmatter.author', null) && ((() => {
                        let author = getData(this.props.pageContext.site.data, _.get(this.props, 'pageContext.frontmatter.author', null));
                        return (
                          <span> by {author.first_name} {author.last_name}</span>
                        );
                    })())}
                  </div>
                </header>
                <div className="post__copy">
                  {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                </div>
              </div>
            </article>
            {
            _.map(posts_sorted, (post_item, post_item_idx) => (
              (_.get(post_item, 'url', null) === _.get(this.props, 'pageContext.url', null)) && ((() => {
                  let curr_index = post_item_idx;
                  let next_index = curr_index + 1;
                  let prev_index = curr_index - 1;
                  let post_index_length = post_item_len - 1;
                  return (
                    (post_index_length > 0) && (
                    <nav key={post_item_idx} className="section section--posts">
                      <div className="container container--md">
                        <h2 className="section__title">Read Next</h2>
                        <div className="flex flex--col-2">
                          {(curr_index !== 0) && ((() => {
                              let prev_post = posts_sorted[prev_index];
                              return (
                                <PostNavItem {...this.props} post_page={prev_post} />
                              );
                          })())}
                          {(curr_index < post_index_length) && ((() => {
                              let next_post = posts_sorted[next_index];
                              return (
                                <PostNavItem {...this.props} post_page={next_post} />
                              );
                          })())}
                        </div>
                      </div>
                    </nav>
                    )
                  );
              })())
            ))}
            </Layout>
        );
    }
}
