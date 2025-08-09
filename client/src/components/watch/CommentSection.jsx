import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useEffect, useRef } from "react";

import { CommentSectionLoader } from "../ui/Loader";
import { useFetchComments } from "../../hooks";

const CommentSection = ({ currentVideo }) => {
  const { comments, error, isLoading, fetchComments } = useFetchComments();

  const commentSectionRef = useRef(null);

  useEffect(() => {
    let wasIntersecting = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !wasIntersecting) {
            fetchComments(currentVideo.videoId);
            wasIntersecting = true; // Prevent multiple calls
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sectionNode = commentSectionRef.current;
    if (sectionNode) {
      observer.observe(sectionNode);
    }

    return () => {
      if (sectionNode) observer.unobserve(sectionNode);
    };
  }, [currentVideo.videoId, fetchComments]);

  if (isLoading) return <CommentSectionLoader />;

  return (
    <div ref={commentSectionRef}>
      <div className="mt-6 mb-8 flex flex-col  space-y-3 justify-center">
        <div className="flex space-x-6">
          <h2 className="text-xl font-bold">{comments.length} Comments</h2>
          <button title="sort comments" className="btn btn-sm btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
            </svg>
            <span>Sort by</span>
          </button>
        </div>

        {/* Input field for adding a comment */}
        <CommentForm />
      </div>
      <div className="flex flex-col space-y-3 justify-center ">
        {comments.length > 0 ? (
          comments?.map((comment) => (
            <Comment key={comment.commentId} comment={comment} />
          ))
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
