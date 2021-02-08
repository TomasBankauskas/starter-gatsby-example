import React from 'react';
import _ from 'lodash';

import {getPageByFilePath, getPages} from '../utils';
import FeaturedPostItem from './FeaturedPostItem';
import BlogPostFeedItem from './BlogPostFeedItem';

export default class BlogFeedSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let posts_all = getPages(this.props.pageContext.pages, '/blog');
        let posts_sorted = _.orderBy(posts_all, 'frontmatter.date', 'desc');
        let show_recent = _.get(section, 'show_recent', null);
        let recent_count = _.get(section, 'recent_count', null);
        let post_count = 0;
        return (
            <section className="section section--posts">
              {_.get(section, 'title', null) && (
              <div className="container container--md align-center">
                <h2 className="section__title">{_.get(section, 'title', null)}</h2>
              </div>
              )}
              <div className="container container--lg">
                {_.get(section, 'feat_posts', null) && (
                <div className="featured">
                  {_.map(_.get(section, 'feat_posts', null), (feat_post, feat_post_idx) => {
                      let feat_post_page = getPageByFilePath(this.props.pageContext.pages, feat_post);
                      return (
                        <FeaturedPostItem key={feat_post_idx} {...this.props} blog_feed_section={section} post_page={feat_post_page} />
                      )
                  })}
                </div>
                )}
                <div className="flex flex--col-3">
                  {_.map(posts_sorted, (post, post_idx) => {
                      let is_post = false;
                      if ((_.get(post, 'frontmatter.template', null) === 'post')) {
                           is_post = true;
                      }
                      return (<React.Fragment key={post_idx + '.1'}>
                        {(is_post && ((show_recent === false) || (post_count < recent_count))) && ((() => {
                             post_count = post_count + 1;
                            return (
                              <BlogPostFeedItem key={post_idx} {...this.props} blog_feed_section={section} post_page={post} />
                            );
                        })())}
                      </React.Fragment>)
                  })}
                </div>
              </div>
            </section>
        );
    }
}
