document.addEventListener('DOMContentLoaded', function() {
    const blogTitle = document.getElementById('blogTitle');
    const blogContent = document.getElementById('blogContent');
    const blogList = document.getElementById('blogList');

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    function saveBlogs() {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }

    function renderBlogs() {
        blogList.innerHTML = '';
        blogs.forEach((blog) => {
            const li = document.createElement('li');
            li.className = 'blog-item';
            li.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.content}</p>
            `;
            blogList.appendChild(li);
        });
    }

    function addBlog() {
        const title = blogTitle.value.trim();
        const content = blogContent.value.trim();
        if (title && content) {
            blogs.push({ title, content });
            saveBlogs();
            renderBlogs();
            blogTitle.value = '';
            blogContent.value = '';
        }
    }

    document.getElementById('addBlog').addEventListener('click', addBlog);

    blogTitle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBlog();
        }
    });

    blogContent.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            addBlog();
        }
    });

    renderBlogs();
}); 