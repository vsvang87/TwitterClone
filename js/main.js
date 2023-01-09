import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//clicking on specific card
document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetClick();
  }
});
//passing down e.target.dataset.like as tweetId
function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter((tweet) => {
    return tweet.uuid === tweetId;
  })[0];
  //increment and decrement likes icon
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
}

//handle Retweet Click Function
function handleRetweetClick(tweetID) {
  const targetTweetObj = tweetsData.filter((tweet) => {
    return tweet.uuid === tweetID;
  })[0];
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

//reply function
function handleReplyClick(replyID) {
  document.getElementById(`replies-${replyID}`).classList.toggle("hidden");
}
//tweet function
function handleTweetClick(tweetID) {
  const tweetInput = document.getElementById("tweet-input");
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@Scrimba 💎`,
      profilePic: `images/troll.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    render();
  }
  tweetInput.value = "";
}

//render to HTML
function getFeedHtml() {
  let feedHtml = ``;
  tweetsData.forEach((tweet) => {
    //add color to the heart icon
    let likeIconClass = "";
    if (tweet.isLiked) {
      likeIconClass = "liked";
    }
    //add color to retweet icon
    let retweetIconClass = "";
    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }
    let repliesHtml = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        repliesHtml = `
        <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
        `;
      });
    }

    feedHtml += `
     <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-regular fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
    ${repliesHtml}
    </div>
</div>
    `;
  });
  return feedHtml;
}
//rendering into html
function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
