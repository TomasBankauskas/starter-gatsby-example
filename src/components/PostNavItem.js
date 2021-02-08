import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Link, withPrefix, getData} from '../utils';

export default class PostNavItem extends React.Component {
    render() {
        let post = _.get(this.props, 'post_page', null);
        return (
            <article className="cell">
              <div className="card">
                {_.get(post, 'frontmatter.image', null) && (
                <Link className="card__media card__media--top" to={withPrefix(_.get(post, 'url', null))}>
                  <img src={withPrefix(_.get(post, 'frontmatter.image', null))} alt={_.get(post, 'frontmatter.image_alt', null)} />
                </Link>
                )}
                <div className="card__body">
                  <header className="card__header">
                    <h3 className="h4 card__title"><Link to={withPrefix(_.get(post, 'url', null))}>{_.get(post, 'frontmatter.title', null)}</Link></h3>
                  </header>
                  {_.get(post, 'frontmatter.excerpt', null) && (
                    <div className="card__copy">
                      <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
                    </div>
                  )}
                  <footer className="card__footer">
                    <span>On <time dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time></span>
                    {_.get(post, 'frontmatter.author', null) && ((() => {
                        let author = getData(this.props.pageContext.site.data, _.get(post, 'frontmatter.author', null));
                        return (
                          <span> by {author.first_name} {author.last_name}</span>
                        );
                    })())}
                  </footer>
                </div>
              </div>
            </article>
        );
    }
}
