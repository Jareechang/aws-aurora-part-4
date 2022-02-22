import { NextRequest, NextResponse } from 'next';
import Comments from '@app/dao/comments/Comments';
import {
  IComments
} from '@app/dao/comments/types';

export default async(req: NextRequest, res: NextResponse) => {
  let results: IComments | null = null;
  let error: any = null;
  const blogId : number = +req.query.blogId;
  try {
    const rows = await Comments.getAllByBlogId(
      blogId
    );
    results = rows;
  } catch (err) {
    error = err;
    console.log('Error querying DB: ', err);
  }
  res.status(200).json({ results, error });
}
