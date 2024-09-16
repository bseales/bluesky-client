// renderer.js

const { BskyAgent } = require('@atproto/api');

const agent = new BskyAgent({ service: 'https://bsky.social' });

// Assuming you have logged in somewhere in your code or using a public feed
// Function to post a status
async function postStatus(text) {
    try {
        const record = await agent.post({
            text: text
        });
        console.log('Post successful:', record);
        // Optionally, refresh the feed after posting
        fetchAndDisplayFeed();
    } catch (error) {
        console.error('Error posting status:', error);
    }
}

// Function to fetch and display feed (as before)
async function fetchAndDisplayFeed() {
    try {
        await agent.login({ identifier: '[username]', password: '[password]' });
        const feed = await agent.getTimeline();
        document.getElementById('feed').innerHTML = '';
        feed.data.feed.forEach(post => {
            const postElement = createPostElement(post);
            document.getElementById('feed').appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching or displaying feed:', error);
    }
}

// Helper function to create a DOM element for each post
function createPostElement(post) {
    const container = document.createElement('div');
    container.className = 'post-container';
    const author = document.createElement('h3');
    author.textContent = post.post.author.displayName;
    container.appendChild(author);
    const content = document.createElement('p');
    content.textContent = post.post.record.text;
    container.appendChild(content);
    return container;
}

// Event listener for form submission
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const statusText = document.getElementById('statusText').value;
    if (statusText.trim()) {
        postStatus(statusText);
        // Clear the text area after posting
        document.getElementById('statusText').value = '';
    }
});

// Initial feed fetch

fetchAndDisplayFeed();