import React from 'react'
import variables from 'variables'

const LinkdropLogo = props => (
  <svg width={189} height={44} fill='none' {...props}>
    <path
      d='M1.944 31H14.05v-3.296H5.942V12.09H1.944V31zm14.678 0h3.934V16.818h-3.934V31zm1.976-15.862c1.145 0 2.133-.868 2.133-1.995 0-1.117-.988-1.985-2.133-1.985-1.136 0-2.123.868-2.123 1.986 0 1.126.987 1.994 2.123 1.994zM27.64 22.8c.009-1.828 1.098-2.899 2.686-2.899 1.58 0 2.53 1.034 2.52 2.77V31h3.934v-9.03c0-3.305-1.939-5.336-4.893-5.336-2.105 0-3.629 1.034-4.266 2.686h-.166v-2.502h-3.749V31h3.934v-8.199zM39.88 31h3.933v-4.506l1.062-1.21L48.744 31h4.607l-5.53-8.042 5.262-6.14h-4.515l-4.542 5.383h-.213v-10.11H39.88V31zm27.854 0V12.09H63.8v7.11h-.12c-.526-1.154-1.661-2.566-4.034-2.566-3.112 0-5.743 2.419-5.743 7.294 0 4.745 2.52 7.303 5.752 7.303 2.29 0 3.48-1.32 4.025-2.502h.176V31h3.878zm-3.85-7.09c0 2.529-1.09 4.19-2.983 4.19-1.93 0-2.982-1.716-2.982-4.19 0-2.457 1.034-4.146 2.982-4.146 1.911 0 2.982 1.615 2.982 4.145zM70.882 31h3.933v-8.023c.01-1.736 1.265-2.927 2.853-2.927.536 0 .97.147 1.34.332l1.18-3.25a3.733 3.733 0 0 0-1.938-.517c-1.597 0-2.89.923-3.407 2.678h-.148v-2.475h-3.813V31zm16.94.277c4.303 0 6.98-2.945 6.98-7.313 0-4.394-2.677-7.33-6.98-7.33-4.312 0-6.98 2.936-6.98 7.33 0 4.368 2.668 7.313 6.98 7.313zm.019-3.047c-1.985 0-3.001-1.819-3.001-4.293 0-2.475 1.016-4.303 3-4.303 1.949 0 2.965 1.828 2.965 4.303 0 2.474-1.016 4.293-2.964 4.293zm17.653 3c3.241 0 5.762-2.557 5.752-7.302.01-4.875-2.622-7.294-5.743-7.294-2.372 0-3.508 1.412-4.034 2.566h-.176v-2.382h-3.878v19.5h3.934v-7.59h.12c.535 1.182 1.726 2.503 4.025 2.503zm-1.246-3.13c-1.893 0-2.973-1.652-2.983-4.19.01-2.521 1.071-4.146 2.983-4.146 1.948 0 2.982 1.68 2.982 4.145 0 2.484-1.053 4.192-2.982 4.192zm29.213 2.9V12.09h-2.179v6.981h-.185c-.48-.739-1.329-2.438-4.099-2.438-3.583 0-6.057 2.844-6.057 7.313 0 4.506 2.474 7.35 6.02 7.35 2.733 0 3.656-1.7 4.136-2.475h.259V31h2.105zm-2.142-7.09c0 3.212-1.441 5.428-4.063 5.428-2.733 0-4.136-2.4-4.136-5.429 0-2.991 1.366-5.318 4.136-5.318 2.659 0 4.063 2.142 4.063 5.318zm12.076 7.386c2.881 0 4.986-1.44 5.651-3.583l-2.105-.59c-.554 1.476-1.837 2.215-3.546 2.215-2.557 0-4.321-1.653-4.422-4.69h10.295v-.924c0-5.28-3.14-7.09-6.094-7.09-3.841 0-6.389 3.028-6.389 7.386 0 4.358 2.511 7.276 6.61 7.276zm-4.422-8.532c.148-2.206 1.708-4.173 4.201-4.173 2.363 0 3.878 1.773 3.878 4.173h-8.079zM152.582 31h2.179v-8.864c0-2.077 1.514-3.545 3.213-3.545 1.653 0 2.807 1.08 2.807 2.696V31h2.216v-9.233c0-1.828 1.145-3.176 3.139-3.176 1.551 0 2.881.822 2.881 2.918V31h2.179v-9.491c0-3.334-1.791-4.875-4.321-4.875-2.031 0-3.518.932-4.247 2.4h-.148c-.702-1.514-1.939-2.4-3.804-2.4-1.847 0-3.213.886-3.804 2.4h-.185v-2.216h-2.105V31zm28.359.296c3.841 0 6.426-2.918 6.426-7.313 0-4.432-2.585-7.35-6.426-7.35s-6.426 2.918-6.426 7.35c0 4.395 2.585 7.313 6.426 7.313zm0-1.958c-2.917 0-4.247-2.511-4.247-5.355 0-2.844 1.33-5.392 4.247-5.392 2.918 0 4.247 2.548 4.247 5.392 0 2.844-1.329 5.355-4.247 5.355z'
      fill={props.fill || variables.blackColor}
    />
  </svg>
)

export default LinkdropLogo
