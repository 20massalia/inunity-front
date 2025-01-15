import { fakerKO as faker } from '@faker-js/faker';
import ResponseArticleThumbnail from './ResponseArticleThumbnail';
import ResponseComment from '@/entities/comment/model/ResponseComment';
import ResponseReplyComment from '@/entities/comment/model/ResponseReplyComment';
import ResponseArticle from './ResponseAritcle';

faker.seed(123);


export function generateMockReplyComment(): ResponseReplyComment {
  return {
    replyCommentId: faker.number.int({ min: 1, max: 10000 }),
    isAnonymous: faker.datatype.boolean(),
    userId: faker.number.int({ min: 1, max: 10000 }),
    department: faker.helpers.arrayElement(['컴퓨터공학과', '전자공학과', '기계공학과', '산업공학과', '화학공학과']),
    nickname: faker.person.fullName(),
    userImageUrl: faker.image.avatar(),
    content: faker.lorem.sentence(),
    isOwner: faker.datatype.boolean(),
    createAt: new Date('2025-01-01 00:00:00')
  };
}

export function generateMockComment(): ResponseComment {
  return {
    commentId: faker.number.int({ min: 1, max: 10000 }),
    isAnonymous: faker.datatype.boolean(),
    userId: faker.number.int({ min: 1, max: 10000 }),
    department: faker.helpers.arrayElement(['컴퓨터공학과', '전자공학과', '기계공학과', '산업공학과', '화학공학과']),
    nickname: faker.person.fullName(),
    userImageUrl: faker.image.avatar(),
    content: faker.lorem.paragraph(),
    isOwner: faker.datatype.boolean(),
    createAt: new Date('2025-01-01 00:00:00')
  };
}

export function generateMockArticle(): ResponseArticle {
  const commentCount = faker.number.int({ min: 0, max: 10 });
  
  return {
    userId: faker.number.int({ min: 1, max: 10000 }),
    department: faker.helpers.arrayElement(['컴퓨터공학과', '전자공학과', '기계공학과', '산업공학과', '화학공학과']),
    nickname: faker.person.fullName(),
    userImageUrl: faker.image.avatar(),
    isAnonymous: faker.datatype.boolean(),
    articleId: faker.number.int({min: 0, max: 10000}),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    view: faker.number.int({ min: 0, max: 1000 }),
    isOwner: faker.datatype.boolean(),
    likeNum: faker.number.int({ min: 0, max: 500 }),
    isLiked: faker.datatype.boolean(),
    createAt: new Date('2025-01-01 00:00:00'),
    updatedAt: new Date('2025-01-01 00:00:00'),
    commentNum: commentCount,
    comments: Array(commentCount)
      .fill(null)
      .map(() => generateMockComment())
  };
}

export function generateMockArticleThumbnail(): ResponseArticleThumbnail {
  return {
    userId: faker.number.int({ min: 1, max: 10000 }),
    department: faker.helpers.arrayElement(['컴퓨터공학과', '전자공학과', '기계공학과', '산업공학과', '화학공학과']),
    nickname: faker.person.fullName(),
    userImageUrl: faker.image.avatar(),
    isAnonymous: faker.datatype.boolean(),
    articleId: faker.number.int({min: 1, max: 10000}),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    createAt: new Date('2025-01-01 00:00:00'),
    updatedAt: new Date('2025-01-01 00:00:00'),
    commentNum: faker.number.int({ min: 0, max: 50 }),
    likeNum: faker.number.int({ min: 0, max: 200 }),
    isLiked: faker.datatype.boolean()
  };
}

export function generateMockArticleThumbnails(count: number): ResponseArticleThumbnail[] {
  return Array(count)
    .fill(null)
    .map(() => generateMockArticleThumbnail());
}

// Helper function to generate an array of comments with replies
export function generateMockCommentsWithReplies(count: number): {
  comments: ResponseComment[];
  replies: Record<number, ResponseReplyComment[]>;
} {
  const comments = Array(count)
    .fill(null)
    .map(() => generateMockComment());
    
  const replies: Record<number, ResponseReplyComment[]> = {};
  
  comments.forEach(comment => {
    const replyCount = faker.number.int({ min: 0, max: 5 });
    if (replyCount > 0) {
      replies[comment.commentId] = Array(replyCount)
        .fill(null)
        .map(() => generateMockReplyComment());
    }
  });
  
  return { comments, replies };
}

