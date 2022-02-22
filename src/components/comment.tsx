import * as React from 'react';
import Date from '@app/components/date'
import {
  Typography,
  Box,
} from '@material-ui/core';
import { css } from '@emotion/css'

export interface CommentProps {
  content: string;
  name: string;
  // date string
  created_at: string;
  // date string
  updated_at: string;
}

const Comment: React.FC<CommentProps> = (
  props
) => {
  const {
    name,
    content,
    updated_at
  } = props;
  if (!name || !content || !updated_at) {
    return null;
  };
  return (
    <Box my={2.5}>
      <Box>
        <Typography
          variant="caption"
          className={css`
            padding-right: 0.5rem;
            font-weight: 500;
          `}
        >
          {name}
        </Typography>
        <Typography
          variant="caption">
          <Date dateString={updated_at} />
        </Typography>
      </Box>
      <Box py={1}>
        {content}
      </Box>
    </Box>
  );
}

export default Comment;
