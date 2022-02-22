import {
  useEffect,
  useState,
} from 'react';
import Layout from '@app/components/layout'
import Head from 'next/head'
import Date from '@app/components/date'
import * as utilStyles from '@app/styles/utils.css'
import {
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import PostService from '@app/services/PostService';
import Comment from '@app/components/comment'
import {
  IComments
} from '@app/dao/comments/types';

export default function Post({ postData }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments(id) {
      try {
        const res = await fetch(`/api/comments?blogId=${id}`);
        const data = await res.json();
        setComments(data?.results ?? []);
      } catch (err) {
        console.log(`fetchComments failed : `, err);
      }
    }
    if (postData?.id) {
      fetchComments(postData?.id);
    }
  }, [postData?.id]);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <Typography variant="h1" className={utilStyles.headingXl}>
          {postData.title}
        </Typography>
        {postData.createdAt && (
          <div className={utilStyles.lightText}>
            Authored: <Date dateString={postData?.createdAt} />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Box py={3}>
        <Divider />
      </Box>
      <section>
        {comments.length > 0 && (
          <Typography variant="h5" className={utilStyles.headingLg}>
            Comments
          </Typography>
        )}
        {
          comments.length > 0 ? comments.map((comment) => (
            <Comment {...comment} />
          )) : (
            <Typography variant="body1">
              No comments yet.
            </Typography>
          )
        }
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const postContentData = await PostService.getBySlug(params?.id);

  if (!postContentData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      postData: {
        ...postContentData,
      }
    }
  }
}
