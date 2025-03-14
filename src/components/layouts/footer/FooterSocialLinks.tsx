export default function FooterSocialLinks() {
    return (
      <div className="mt-6 flex justify-center space-x-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82v-9.294H9.692V11.41h3.129V8.627c0-3.1 1.894-4.792 4.659-4.792 1.325 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.762v2.311h3.587l-.467 3.296h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.93 4.93 0 0 0 2.165-2.724 9.861 9.861 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.384 4.482A13.94 13.94 0 0 1 1.671 3.149a4.922 4.922 0 0 0 1.523 6.573 4.897 4.897 0 0 1-2.229-.616v.062a4.918 4.918 0 0 0 3.946 4.827 4.936 4.936 0 0 1-2.224.084 4.923 4.923 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 21.54a13.933 13.933 0 0 0 7.548 2.212c9.056 0 14.007-7.506 14.007-14.007 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.728V1.729C24 .774 23.204 0 22.225 0zM7.125 20.452H3.544V9.029h3.581v11.423zM5.335 7.674a2.062 2.062 0 1 1 .001-4.124 2.062 2.062 0 0 1 0 4.124zm14.785 12.778h-3.578v-5.567c0-1.327-.025-3.033-1.847-3.033-1.847 0-2.13 1.443-2.13 2.938v5.662h-3.578V9.029h3.437v1.561h.048c.479-.906 1.646-1.861 3.39-1.861 3.629 0 4.3 2.386 4.3 5.487v6.236z" />
          </svg>
        </a>
      </div>
    );
  }
  