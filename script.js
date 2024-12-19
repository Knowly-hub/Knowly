// script.js
document.addEventListener("DOMContentLoaded", () => {
    const scrollUpBtn = document.querySelector(".scroll-up-btn");
  
    // Tampilkan tombol ketika scroll lebih dari 100px
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollUpBtn.classList.add("show");
      } else {
        scrollUpBtn.classList.remove("show");
      }
    });
  
    // Smooth scroll ke atas ketika tombol diklik
    scrollUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  
  
  // Modifikasi pada article cards di file utama
document.querySelectorAll('.article-card').forEach(card => {
  card.addEventListener('click', function() {
      // Ambil data dari card
      const articleData = {
          id: card.dataset.articleId, // Tambahkan data-article-id pada HTML
          title: card.querySelector('h3').textContent,
          image: card.querySelector('img').src,
          period: card.querySelector('.periode').textContent,
          description: card.querySelector('p:last-child').textContent
      };
      
      // Simpan data artikel ke localStorage
      localStorage.setItem('currentArticle', JSON.stringify(articleData));
      
      // Redirect ke halaman detail
      window.location.href = `article-detail.html?id=${articleData.id}`;
  });
});

// article-detail.js
document.addEventListener('DOMContentLoaded', function() {
  // Ambil data artikel dari localStorage
  const articleData = JSON.parse(localStorage.getItem('currentArticle'));
  
  if (articleData) {
      // Isi konten halaman dengan data artikel
      document.getElementById('articleImage').src = articleData.image;
      document.getElementById('articleTitle').textContent = articleData.title;
      document.getElementById('articlePeriod').textContent = articleData.period;
      document.getElementById('articleDescription').textContent = articleData.description;
  }
});





// Course data structure
const courses = [
  {
    id: "web-dev-101",
    title: "Front-End Web Development",
    description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React.",
    duration: "10 Weeks",
    level: "Intermediate",
    author: "Michael Adams",
    category: "Web Development",
    studentCount: 156,
    lessonCount: 20,
    quizCount: 3,
    images: [
      "assets/course-img1.png",
      "assets/course-img2.png",
      "assets/course-img3.png"
    ],
    curriculum: [
      "HTML Fundamentals",
      "CSS Styling and Layouts",
      "JavaScript Basics",
      "Building Responsive Websites",
      "Introduction to Bootstrap and React"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Essentials",
    description: "Covers the essentials of digital marketing, including SEO, social media marketing, email campaigns, and more.",
    duration: "10 Weeks",
    level: "Intermediate",
    author: "Michael Adams",
    category: "Marketing",
    studentCount: 134,
    lessonCount: 15,
    quizCount: 4,
    images: [
      "assets/digmart1.png",
      "assets/digmart2.png",
      "assets/digmart3.png"
    ],
    curriculum: [
      "Digital Marketing Fundamentals",
      "SEO Optimization",
      "Social Media Strategy",
      "Email Marketing",
      "Analytics and Reporting"
    ]
  },
];

// Utility functions
const sanitizeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const getUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Create course card with navigation
function createCourseCard(course) {
  const sanitizedCourse = {
    ...course,
    title: sanitizeHTML(course.title),
    description: sanitizeHTML(course.description),
    author: sanitizeHTML(course.author)
  };

  return `
    <div class="course-card-page" data-course-id="${sanitizedCourse.id}">
      <header>
        <div class="course-header">
          <div>
            <h1 class="course-title">${sanitizedCourse.title}</h1>
            <p class="course-description">${sanitizedCourse.description}</p>
          </div>
          <a href="course-detail-page.html?id=${encodeURIComponent(sanitizedCourse.id)}" 
             class="view-course-btn">
            View Course
          </a>
        </div>

        <div class="course-card-images">
          ${sanitizedCourse.images.map(image => `
            <div class="course-card-image">
              <img src="${sanitizeHTML(image)}" 
                   alt="${sanitizedCourse.title} image"
                   loading="lazy">
            </div>
          `).join('')}
        </div>

        <div class="course-meta">
          <span class="meta-tag">${sanitizedCourse.duration}</span>
          <span class="meta-tag">${sanitizedCourse.level}</span>
        </div>
      </header>

      <section class="curriculum">
        <h2 class="curriculum-title">Curriculum</h2>
        <div class="curriculum-grid">
          ${sanitizedCourse.curriculum.map((item, index) => `
            <div class="curriculum-item">
              <div class="item-number">${String(index + 1).padStart(2, '0')}</div>
              <h3>${sanitizeHTML(item)}</h3>
            </div>
          `).join('')}
        </div>
      </section>

      <div class="author">By ${sanitizedCourse.author}</div>
    </div>
  `;
}

// Initialize course listing page
function initializeCourseListing() {
  const courseContainer = document.getElementById('courseContainer');
  if (courseContainer) {
    courseContainer.innerHTML = courses.map(course => createCourseCard(course)).join('');
  }
}

// Initialize course detail page
function initializeCourseDetail() {
  const courseId = getUrlParameter('id');
  if (!courseId) {
    window.location.href = 'index.html'; // or whatever your course listing page is named
    return;
  }

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    window.location.href = 'index.html';
    return;
  }

  // Update page title
  document.title = `${course.title} - Course Details`;

  // Update course detail elements
  const elements = {
    '.category-badge': course.category,
    '.course-detail-author': `${course.author}`,
    '.course-detail-title': course.title,
    '.meta-item:nth-child(1)': `${course.duration}`,
    '.meta-item:nth-child(2)': `${course.studentCount} Students`,
    '.meta-item:nth-child(3)': ` ${course.level}`,
    '.meta-item:nth-child(4)': ` ${course.lessonCount} Lessons`,
    '.meta-item:nth-child(5)': ` ${course.quizCount} Quizzes`
  };

  Object.entries(elements).forEach(([selector, content]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = sanitizeHTML(content);
    }
  });
}

// Initialize appropriate page based on current URL
document.addEventListener('DOMContentLoaded', () => {
  const isDetailPage = window.location.pathname.includes('course-detail-page');
  if (isDetailPage) {
    initializeCourseDetail();
  } else {
    initializeCourseListing();
  }
});






const tabs = document.querySelectorAll('.overview-tab');
const contents = document.querySelectorAll('.course-overview-container > div');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        contents[index].classList.add('active');
    });
});


document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua elemen dengan kelas .section-header
  const sectionHeaders = document.querySelectorAll('.section-header');

  sectionHeaders.forEach(header => {
      // Tambahkan event listener untuk setiap header
      header.addEventListener('click', function () {
          // Temukan konten terkait dengan header ini
          const content = header.nextElementSibling;

          // Toggle class 'active' untuk menampilkan atau menyembunyikan konten
          content.classList.toggle('active');

          // Untuk mengubah ikon chevron
          const icon = header.querySelector('.bx-chevron-down');
          if (content.classList.contains('active')) {
              icon.classList.replace('bx-chevron-down', 'bx-chevron-up');
          } else {
              icon.classList.replace('bx-chevron-up', 'bx-chevron-down');
          }
      });
  });
});






