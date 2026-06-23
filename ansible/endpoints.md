# API Endpoints

Extracted from `file.js` (minified frontend bundle).

---

## Activity
- `GET` `/api/Activity/activity-approver-can-be-restricted`
- `POST` `/api/Activity/archive-many-activities`
- `POST` `/api/Activity/create-many-activities-for-content`
- `POST` `/api/Activity/delete-many-activities`
- `GET` `/api/Activity/get-activity/{id}`
- `GET` `/api/Activity/get-activity-by-id/{id}`
- `GET` `/api/Activity/get-activity-by-id/{id}/{param2}`
- `GET` `/api/Activity/get-users-for-activities`

## AdminDashboard
- `GET` `/api/AdminDashboard/get-admin-dashboard-stats`

## ApiConfiguration
- `DELETE` `/api/ApiConfiguration/delete-api-configuration/{id}`
- `GET` `/api/ApiConfiguration/get-api-configuration/{id}`
- `GET` `/api/ApiConfiguration/get-api-configurations`
- `GET` `/api/ApiConfiguration/get-user-data-api-endpoint-base`
- `POST` `/api/ApiConfiguration/post-api-configuration`

## Artifact
- `POST` `/api/Artifact/download-resource`
- `GET` `/api/Artifact/get-artifact-path/{id}`
- `GET` `/api/Artifact/get-content-launch-wrapper-file-name`
- `GET` `/api/Artifact/get-pdf-wrapper-file-name`
- `GET` `/api/Artifact/get-storage-base-path`
- `GET` `/api/Artifact/get-video-wrapper-file-name`
- `POST` `/api/Artifact/move-artifact-to-new-storage`

## Attachment
- `POST` `/api/Attachment/delete-attachment-artifact/{id}/{param2}`
- `GET` `/api/Attachment/get-attachment-artifacts/{id}/{param2}`
- `POST` `/api/Attachment/post-attachment-artifact`

## AutomatedAccountManagementRule
- `POST` `/api/AutomatedAccountManagementRule/delete-automated-account-management-rule`
- `GET` `/api/AutomatedAccountManagementRule/get-automated-account-management-rule`
- `POST` `/api/AutomatedAccountManagementRule/post-automated-account-management-rule`

## Cart
- `POST` `/api/Cart/add-to-cart/{id}`
- `POST` `/api/Cart/assign-purchased-seats`
- `POST` `/api/Cart/calculate-tax`
- `POST` `/api/Cart/change-cart-item-seat-count/{id}/{param2}/{param3}`
- `POST` `/api/Cart/clear-cart`
- `POST` `/api/Cart/create-braintree-transaction/{id}`
- `GET` `/api/Cart/do-i-have-purchased-seat-assignments`
- `GET` `/api/Cart/get-cart/{id}`
- `GET` `/api/Cart/get-paypal-braintree-transaction/{id}`
- `GET` `/api/Cart/get-purchased-seat-assignments`
- `GET` `/api/Cart/get-purchased-seat-assignments-for-purchase-item/{id}`
- `GET` `/api/Cart/get-stripe-object/{id}/{param2}`
- `POST` `/api/Cart/handle-paypal-braintree-payment-error/{id}`
- `POST` `/api/Cart/handle-stripe-payment-error`
- `POST` `/api/Cart/redeem-seat-reservation-code/{code}`
- `POST` `/api/Cart/remove-from-cart/{id}`
- `POST` `/api/Cart/resend-purchased-seat-invite/{id}`
- `POST` `/api/Cart/revoke-reserved-seat/{id}`

## ClientDataMapConfiguration
- `POST` `/api/ClientDataMapConfiguration/clone-client-data-map-configurations/{id}/{param2}`
- `GET` `/api/ClientDataMapConfiguration/get-client-data-maps-for-admin-data-upload`
- `GET` `/api/ClientDataMapConfiguration/get-match-search-formats`
- `GET` `/api/ClientDataMapConfiguration/get-types/{id}/{param2}`

## Configuration
- `GET` `/api/Configuration/get-application-skin-configurations`
- `GET` `/api/Configuration/get-application-skin-with-configuration-for-url`
- `GET` `/api/Configuration/get-client-environments-for-config-template`
- `GET` `/api/Configuration/get-external-completion-action-counts`
- `GET` `/api/Configuration/get-failed-content-completion-actions/{id}/{param2}`
- `GET` `/api/Configuration/get-outbound-ip-address`
- `GET` `/api/Configuration/get-site-info`
- `GET` `/api/Configuration/get-tax-code-content-type-data`
- `GET` `/api/Configuration/get-xapi-actor-extension-data`
- `GET` `/api/Configuration/is-production`
- `POST` `/api/Configuration/post-tax-code-content-type-data`
- `POST` `/api/Configuration/post-xapi-actor-extension-data`
- `GET` `/api/Configuration/retry-failed-content-completion-action/{id}`
- `GET` `/api/Configuration/update-client-configurations-from-template/{id}`

## ContentCertificate
- `POST` `/api/ContentCertificate/copy-cert/{id}/{param2}`
- `DELETE` `/api/ContentCertificate/delete-cert-atttempt/{id}`
- `POST` `/api/ContentCertificate/generate-certificate-file/{id}/{param2}/{param3}`
- `GET` `/api/ContentCertificate/get-cert-attempts-for-content-for-user/{id}`
- `GET` `/api/ContentCertificate/get-certificate-for-content-for-signee/{id}/{param2}/{param3}`
- `GET` `/api/ContentCertificate/get-certs-for-copy`
- `POST` `/api/ContentCertificate/reset-many-certificate-attempts-for-user`
- `POST` `/api/ContentCertificate/save-certificate-signature`
- `POST` `/api/ContentCertificate/sign-certificate-by-admin`

## ContentClass
- `DELETE` `/api/ContentClass/delete-class-group-translation/{id}`
- `POST` `/api/ContentClass/drop-content-class`
- `POST` `/api/ContentClass/drop-content-class-approval-request`
- `POST` `/api/ContentClass/drop-content-class-approval-request-action/{id}/{param2}`
- `POST` `/api/ContentClass/enroll-content-class/{id}`
- `POST` `/api/ContentClass/enroll-content-class-approval-request/{id}`
- `POST` `/api/ContentClass/enroll-content-class-approval-request-action/{id}/{param2}`
- `POST` `/api/ContentClass/enroll-in-class-group`
- `GET` `/api/ContentClass/get-class-added-notification-subscriptions`
- `GET` `/api/ContentClass/get-class-drop-reasons/{id}`
- `GET` `/api/ContentClass/get-class-drop-reasons-for-user-drop/{id}/{param2}`
- `GET` `/api/ContentClass/get-class-enroll-questions/{id}`
- `GET` `/api/ContentClass/get-class-group/{id}`
- `GET` `/api/ContentClass/get-class-group-auto-enrollment-for-learning-path/{id}`
- `GET` `/api/ContentClass/get-class-group-auto-enrollment-for-learning-path/{id}/{param2}`
- `GET` `/api/ContentClass/get-class-group-lookup/{id}`
- `GET` `/api/ContentClass/get-class-groups`
- `GET` `/api/ContentClass/get-class-groups-with-content-classes/{id}`
- `GET` `/api/ContentClass/get-content-class-attendance/{id}/{param2}`
- `GET` `/api/ContentClass/get-content-class-drop-reason-messages/{id}`
- `GET` `/api/ContentClass/get-content-classes/{id}`
- `GET` `/api/ContentClass/get-content-classes-for-ilt-attendance/{id}`
- `GET` `/api/ContentClass/get-content-for-ilt-attendance`
- `GET` `/api/ContentClass/get-drop-enroll-content-class-approval-request/{id}`
- `POST` `/api/ContentClass/post-class-drop-reasons/{id}/{param2}`
- `POST` `/api/ContentClass/post-class-enroll-questions/{id}/{param2}`
- `POST` `/api/ContentClass/post-class-group`
- `POST` `/api/ContentClass/post-class-group-translation`
- `POST` `/api/ContentClass/schedule-class-added-notification/{id}`
- `POST` `/api/ContentClass/unschedule-class-added-notification/{id}`

## ContentCompletion
- `GET` `/api/ContentCompletion/get-newly-created-user-rewards/{id}`

## Country
- `GET` `/api/Country/get-countries-lookup`

## Course
- `GET` `/api/Course/am-i-activity-approver`
- `POST` `/api/Course/create-many-exemptions-for-content`
- `POST` `/api/Course/create-user-content-exemptions`
- `POST` `/api/Course/delete-exemptions-for-content`
- `POST` `/api/Course/delete-many-user-content-manual-assignments`
- `POST` `/api/Course/delete-user-content-exemption`
- `GET` `/api/Course/get-all-consolidated-statuses`
- `GET` `/api/Course/get-content-image-media-library`
- `GET` `/api/Course/get-courses/{id}/{param2}`
- `POST` `/api/Course/get-exemptions-for-content`
- `GET` `/api/Course/get-existing-content-client-identifiers`
- `GET` `/api/Course/get-home-page-content-group-view-model/{id}`
- `GET` `/api/Course/get-manual-assignments-for-content/{id}`
- `GET` `/api/Course/get-previous-user-search-phrases`
- `GET` `/api/Course/get-recommended-content/{id}`
- `GET` `/api/Course/get-refresher-reassign-from-date-options`
- `GET` `/api/Course/get-user-content-exemptions/{id}`
- `POST` `/api/Course/merge-media-library-content-images`
- `POST` `/api/Course/post-single-course-sort-order`
- `POST` `/api/Course/post-user-content-exemption`
- `POST` `/api/Course/reassign-refresher-content`
- `POST` `/api/Course/share-content`
- `POST` `/api/Course/sync-chapterspot-learning-modules`
- `POST` `/api/Course/update-media-library-content-image`
- `POST` `/api/Course/update-user-content-manual-assignment`

## CourseContent
- `POST` `/api/CourseContent/activate-course-content-version/{id}/{param2}`
- `POST` `/api/CourseContent/create-content-keyword-exclusion/{id}`
- `GET` `/api/CourseContent/delete-all-content-keywords-for-course-content/{id}`
- `POST` `/api/CourseContent/delete-content-keyword-exclusion/{id}`
- `DELETE` `/api/CourseContent/delete-course-content-version/{id}`
- `POST` `/api/CourseContent/download-content-file`
- `GET` `/api/CourseContent/get-content-keyword-exclusions`
- `GET` `/api/CourseContent/get-content-translation/{id}`
- `GET` `/api/CourseContent/get-content-translation-for-scorm-homepage/{id}/{param2}`
- `GET` `/api/CourseContent/get-content-translations-for-content/{id}`
- `GET` `/api/CourseContent/get-course-content-keywords/{id}/{param2}`
- `GET` `/api/CourseContent/get-course-content-path-for-inactive-version/{id}/{param2}`
- `GET` `/api/CourseContent/get-unique-content-keywords`
- `POST` `/api/CourseContent/post-course-content-version`
- `POST` `/api/CourseContent/upload-content-file`

## CourseGroup
- `GET` `/api/CourseGroup/get-content-for-content-group/{id}`
- `GET` `/api/CourseGroup/get-content-group-image-media-library`
- `POST` `/api/CourseGroup/merge-media-library-content-group-images`
- `POST` `/api/CourseGroup/post-content-group-content-sort-order`
- `POST` `/api/CourseGroup/reset-content-group-content-sort-order/{id}`
- `POST` `/api/CourseGroup/update-media-library-content-group-image`

## CustomField
- `GET` `/api/CustomField/get-custom-field/{id}`
- `GET` `/api/CustomField/get-custom-field-objects`
- `GET` `/api/CustomField/get-custom-field-types`
- `POST` `/api/CustomField/get-custom-fields`
- `POST` `/api/CustomField/get-custom-fields-for-my-profile`
- `POST` `/api/CustomField/get-custom-fields-for-user/{id}`
- `GET` `/api/CustomField/get-grouped-custom-fields`
- `POST` `/api/CustomField/get-user-custom-fields-for-report`
- `POST` `/api/CustomField/reset-custom-field-sort-order/{id}`
- `POST` `/api/CustomField/save-custom-field`

## DownloadLaunchTracking
- `POST` `/api/DownloadLaunchTracking/post-attachment-download`
- `POST` `/api/DownloadLaunchTracking/post-content-launch`
- `POST` `/api/DownloadLaunchTracking/post-content-launch-external-link`

## EmailNotification
- `GET` `/api/EmailNotification/get-email-notification-types-for-report`
- `POST` `/api/EmailNotification/send-custom-email`

## Enrollment
- `POST` `/api/Enrollment/archive-enrollments-for-content`
- `POST` `/api/Enrollment/archive-many-enrollments`
- `POST` `/api/Enrollment/create-many-enrollments-for-content`
- `POST` `/api/Enrollment/delete-many-enrollments`
- `GET` `/api/Enrollment/get-enrollment/{id}/{param2}/{param3}/{param4}`
- `GET` `/api/Enrollment/get-enrollment-for-preview/{id}`
- `POST` `/api/Enrollment/get-enrollments-for-content`
- `POST` `/api/Enrollment/reset-progress-for-content`
- `POST` `/api/Enrollment/reset-progress-for-content-tracking/{id}`
- `POST` `/api/Enrollment/update-user-content-data/{id}`

## EnrollmentGroup
- `GET` `/api/EnrollmentGroup/get-enrollment-groups-for-reports`
- `POST` `/api/EnrollmentGroup/update-enrollment-group-assignments/{id}`

## Exam
- `POST` `/api/Exam/copy-exam/{id}/{param2}/{param3}`
- `POST` `/api/Exam/copy-exam-question-bank-question/{id}`
- `DELETE` `/api/Exam/delete-exam-atttempt/{id}`
- `DELETE` `/api/Exam/delete-exam-bank-question/{id}`
- `GET` `/api/Exam/get-exam-attempts-for-content-for-user/{id}`
- `GET` `/api/Exam/get-exam-for-exam-dashboard/{id}`
- `GET` `/api/Exam/get-exam-preview-for-content-translation/{id}/{param2}/{param3}`
- `GET` `/api/Exam/get-exam-question-bank-question/{id}`
- `GET` `/api/Exam/get-exam-question-bank-question-preview/{id}`
- `GET` `/api/Exam/get-exam-question-bank-questions`
- `GET` `/api/Exam/get-exam-question-category-drop-down-items/{id}`
- `GET` `/api/Exam/get-exams-for-copy`
- `POST` `/api/Exam/is-exam-question-response-correct`
- `POST` `/api/Exam/move-exam-question-to-question-bank`
- `POST` `/api/Exam/post-exam-bank-question`
- `POST` `/api/Exam/post-user-exam-max-attempt`
- `POST` `/api/Exam/post-user-exam-pending`
- `POST` `/api/Exam/reset-exam-pending-for-user/{id}/{param2}`
- `POST` `/api/Exam/reset-many-exam-attempts-for-user`
- `POST` `/api/Exam/reset-many-exam-pending-for-user`
- `POST` `/api/Exam/save-user-exam-signature`
- `POST` `/api/Exam/save-user-exam-webcam-picture`

## External
- `POST` `/api/External/download-external-blob`
- `POST` `/api/External/get-external-blob-hierarchy`

## FtpConfiguration
- `DELETE` `/api/FtpConfiguration/delete-ftp-configuration/{id}`
- `GET` `/api/FtpConfiguration/get-ftp-configuration/{id}`
- `GET` `/api/FtpConfiguration/get-ftp-configurations`
- `POST` `/api/FtpConfiguration/post-ftp-configuration`

## Language
- `POST` `/api/Language/delete-client-translation-override/{id}/{param2}`

## LayoutTemplate
- `DELETE` `/api/LayoutTemplate/delete-layout-template/{id}`
- `GET` `/api/LayoutTemplate/get-active-layout-template/{id}`
- `GET` `/api/LayoutTemplate/get-layout-group-containers`
- `GET` `/api/LayoutTemplate/get-layout-pages`
- `GET` `/api/LayoutTemplate/get-layout-template/{id}`
- `GET` `/api/LayoutTemplate/get-layout-template-for-preview/{id}`
- `GET` `/api/LayoutTemplate/get-layout-templates/{id}`
- `GET` `/api/LayoutTemplate/get-platform-layout-templates/{id}`
- `POST` `/api/LayoutTemplate/save-layout-template`
- `POST` `/api/LayoutTemplate/save-platform-layout-template`
- `POST` `/api/LayoutTemplate/update-layout-setting-for-user`

## LeaderBoard
- `DELETE` `/api/LeaderBoard/delete-leader-board/{id}`
- `GET` `/api/LeaderBoard/get-full-leader-board-rankings/{id}`
- `GET` `/api/LeaderBoard/get-leader-board-by-leader-board-type/{id}`
- `GET` `/api/LeaderBoard/get-leader-board-rankings`
- `GET` `/api/LeaderBoard/get-leader-board-types`
- `POST` `/api/LeaderBoard/save-leader-board`

## LearningPath
- `POST` `/api/LearningPath/copy-learning-path/{id}`
- `DELETE` `/api/LearningPath/delete-learning-path-translation/{id}`
- `POST` `/api/LearningPath/delete-many-learning-path-manual-assignments`
- `GET` `/api/LearningPath/get-existing-learning-path-client-identifiers`
- `GET` `/api/LearningPath/get-learning-paths-with-content`
- `GET` `/api/LearningPath/get-user-graduated-learning-paths/{id}`
- `GET` `/api/LearningPath/get-user-learning-path-assignments-for-learning-path/{id}`
- `GET` `/api/LearningPath/get-user-learning-path-nav-links`
- `GET` `/api/LearningPath/get-user-learning-paths-with-skin`
- `GET` `/api/LearningPath/learning-path-content-needs-purchase/{id}`
- `POST` `/api/LearningPath/post-learning-path-sort-order`
- `POST` `/api/LearningPath/post-learning-path-translation`
- `POST` `/api/LearningPath/reset-learning-path-sort-order`
- `POST` `/api/LearningPath/update-user-learning-path-assignment`

## LocationGroup
- `GET` `/api/LocationGroup/am-i-location-group-relationship-user`
- `GET` `/api/LocationGroup/get-parent-location-groups`
- `GET` `/api/LocationGroup/location-group-relationship-types-configured`

## LoginOption
- `DELETE` `/api/LoginOption/delete-login-option-translation/{id}`
- `GET` `/api/LoginOption/get-login-option-for-language/{id}`
- `GET` `/api/LoginOption/get-login-option-translations`
- `POST` `/api/LoginOption/post-login-option-translation`

## NavigationMenu
- `GET` `/api/NavigationMenu/get-report-dashboard-data/{id}`
- `POST` `/api/NavigationMenu/reset-menu-item-sort-orders/{id}`
- `POST` `/api/NavigationMenu/update-menu-item-sort-orders`

## OrgUnit
- `GET` `/api/OrgUnit/get-org-unit-lookup`

## PermissionGroup
- `GET` `/api/PermissionGroup/get-location-group-filter-options`

## PermissionRole
- `GET` `/api/PermissionRole/get-roles-for-report`

## Program
- `GET` `/api/Program/get-existing-program-client-identifiers`
- `GET` `/api/Program/get-program-image-media-library`
- `GET` `/api/Program/get-user-program-completion-view-models/{id}`
- `POST` `/api/Program/merge-media-library-program-images`
- `POST` `/api/Program/post-single-program-sort-order`
- `POST` `/api/Program/update-media-library-program-image`

## ReleaseNotes
- `GET` `/api/ReleaseNotes/get-feature-categories`
- `GET` `/api/ReleaseNotes/get-features-for-client`
- `GET` `/api/ReleaseNotes/get-published-releases-for-client`
- `GET` `/api/ReleaseNotes/get-release-notes-for-client/{id}`
- `GET` `/api/ReleaseNotes/is-feature-voting-enabled`
- `POST` `/api/ReleaseNotes/vote-for-feature-by-client`

## Reports
- `DELETE` `/api/Reports/delete-report-view/{id}`
- `POST` `/api/Reports/get-completion-dashboard`
- `POST` `/api/Reports/get-content-usage-dashboard`
- `POST` `/api/Reports/get-exam-dashboard-exam-attempt-status`
- `POST` `/api/Reports/get-exam-dashboard-exam-question-responses`
- `POST` `/api/Reports/get-exam-dashboard-exam-score-summary`
- `POST` `/api/Reports/get-exam-dashboard-number-exam-attempts`
- `POST` `/api/Reports/get-login-dashboard-daily-login-data`
- `POST` `/api/Reports/get-login-dashboard-monthly-login-by-location-or-org-unit-data`
- `POST` `/api/Reports/get-login-dashboard-monthly-login-data`
- `GET` `/api/Reports/get-report-data/{id}`
- `POST` `/api/Reports/get-report-file-name`
- `GET` `/api/Reports/get-report-views/{id}`
- `POST` `/api/Reports/get-survey-dashboard-survey-attempts`
- `POST` `/api/Reports/get-survey-dashboard-survey-question-responses`
- `POST` `/api/Reports/get-user-learning-path-completion-dashboard`
- `POST` `/api/Reports/post-pinned-report/{id}/{param2}`
- `POST` `/api/Reports/save-report-view`
- `POST` `/api/Reports/show-report-on-screen`

## RewardDiscountCode
- `GET` `/api/RewardDiscountCode/get-reward-discount-code-count`
- `GET` `/api/RewardDiscountCode/get-reward-discount-codes`
- `POST` `/api/RewardDiscountCode/upload-reward-discount-codes`

## RewardGroup
- `POST` `/api/RewardGroup/assign-discount-code-to-pending-earning-reward-groups`
- `POST` `/api/RewardGroup/assign-discount-code-to-single-user-reward-group`
- `POST` `/api/RewardGroup/copy-reward-group/{id}`
- `DELETE` `/api/RewardGroup/delete-reward-group-badge-translation/{id}`
- `GET` `/api/RewardGroup/get-assigned-discount-codes-for-user/{id}`
- `GET` `/api/RewardGroup/get-earned-reward-groups-pending-discount-code`
- `GET` `/api/RewardGroup/get-earned-rewards-count`
- `GET` `/api/RewardGroup/get-reward-group-badge/{id}`
- `GET` `/api/RewardGroup/get-reward-group-badge-dropdown`
- `GET` `/api/RewardGroup/get-reward-group-badges`
- `GET` `/api/RewardGroup/get-reward-group-lookup`
- `GET` `/api/RewardGroup/get-user-rewards`
- `POST` `/api/RewardGroup/post-reward-group-badge`
- `POST` `/api/RewardGroup/post-reward-group-badge-translation`

## RewardSkill
- `DELETE` `/api/RewardSkill/delete-reward-skill/{id}`
- `DELETE` `/api/RewardSkill/delete-reward-skill-category/{id}`
- `DELETE` `/api/RewardSkill/delete-reward-skill-translation/{id}`
- `GET` `/api/RewardSkill/get-reward-skill/{id}`
- `GET` `/api/RewardSkill/get-reward-skill-categories`
- `GET` `/api/RewardSkill/get-reward-skill-category/{id}`
- `GET` `/api/RewardSkill/get-reward-skill-category-drop-down-items/{id}`
- `GET` `/api/RewardSkill/get-reward-skills`
- `POST` `/api/RewardSkill/post-reward-skill`
- `POST` `/api/RewardSkill/post-reward-skill-category`
- `POST` `/api/RewardSkill/post-reward-skill-translation`

## Schedule
- `DELETE` `/api/Schedule/delete-schedule/{id}`
- `GET` `/api/Schedule/get-azure-database-info`
- `GET` `/api/Schedule/get-schedules-for-report/{id}`
- `GET` `/api/Schedule/get-schedules-not-for-reports-or-ftp-or-api-pull`
- `GET` `/api/Schedule/get-time-zones`
- `POST` `/api/Schedule/post-schedule`

## ScormDispatch
- `DELETE` `/api/ScormDispatch/delete-scorm-dispatch-package/{id}`
- `POST` `/api/ScormDispatch/generate-scorm-dispatch-package`
- `POST` `/api/ScormDispatch/post-scorm-dispatch-request`

## SocialForum
- `DELETE` `/api/SocialForum/delete-comment/{id}`
- `DELETE` `/api/SocialForum/delete-flagged-comment/{id}`
- `DELETE` `/api/SocialForum/delete-flagged-post/{id}`
- `DELETE` `/api/SocialForum/delete-post/{id}`
- `PUT` `/api/SocialForum/flag-comment/{id}`
- `PUT` `/api/SocialForum/flag-post/{id}`
- `GET` `/api/SocialForum/get-flagged-items`
- `GET` `/api/SocialForum/get-possible-forum-associations`
- `GET` `/api/SocialForum/get-post/{id}`
- `GET` `/api/SocialForum/get-posts`
- `GET` `/api/SocialForum/get-posts-for-id/{id}`
- `PUT` `/api/SocialForum/react-to-comment/{id}/{param2}/{param3}`
- `PUT` `/api/SocialForum/react-to-post/{id}/{param2}/{param3}`
- `POST` `/api/SocialForum/save-comment`
- `POST` `/api/SocialForum/save-post`
- `PUT` `/api/SocialForum/unflag-comment/{id}`
- `PUT` `/api/SocialForum/unflag-post/{id}`

## SsoConfiguration
- `GET` `/api/SsoConfiguration/get-sso-transaction/{id}`

## Survey
- `POST` `/api/Survey/complete-survey-for-user`
- `POST` `/api/Survey/copy-survey/{id}/{param2}`
- `DELETE` `/api/Survey/delete-survey-translation-for-content/{id}`
- `DELETE` `/api/Survey/delete-survey-translation-for-system-notification/{id}`
- `GET` `/api/Survey/get-question-groups-for-clone/{id}`
- `GET` `/api/Survey/get-questions-for-clone/{id}`
- `GET` `/api/Survey/get-survey-for-content/{id}`
- `GET` `/api/Survey/get-survey-for-survey-dashboard/{id}`
- `GET` `/api/Survey/get-survey-for-system-notification/{id}`
- `GET` `/api/Survey/get-survey-preview-for-content-translation/{id}/{param2}`
- `GET` `/api/Survey/get-survey-preview-for-system-notification-translation/{id}/{param2}`
- `GET` `/api/Survey/get-surveys-for-copy`
- `POST` `/api/Survey/post-survey`
- `POST` `/api/Survey/reset-many-survey-responses-for-user`
- `POST` `/api/Survey/reset-survey-response-for-user/{id}/{param2}`

## SystemNotification
- `POST` `/api/SystemNotification/save-notification-ack-from-survey`

## TwoFactorAuthentication
- `DELETE` `/api/TwoFactorAuthentication/delete-all-two-factor-enrollments-for-user/{id}`
- `DELETE` `/api/TwoFactorAuthentication/delete-two-factor-enrollment/{id}`
- `POST` `/api/TwoFactorAuthentication/dismiss-secure-you-account-prompt`
- `GET` `/api/TwoFactorAuthentication/generate-two-factor-auth-totp-uri`
- `GET` `/api/TwoFactorAuthentication/get-enrolled-two-factor-methods`
- `GET` `/api/TwoFactorAuthentication/get-enrolled-two-factor-methods-for-user/{id}`
- `GET` `/api/TwoFactorAuthentication/get-two-factor-auth-providers-for-login`
- `GET` `/api/TwoFactorAuthentication/get-user-two-factor-method-enrollment`
- `GET` `/api/TwoFactorAuthentication/is-two-factor-auth-enabled`
- `GET` `/api/TwoFactorAuthentication/is-two-factor-auth-management-available`
- `GET` `/api/TwoFactorAuthentication/is-two-factor-auth-management-available-for-user/{id}`
- `GET` `/api/TwoFactorAuthentication/is-two-factor-auth-required-for-user`
- `GET` `/api/TwoFactorAuthentication/is-two-factor-auth-setup-required-for-user`
- `POST` `/api/TwoFactorAuthentication/send-two-factor-auth-code`
- `POST` `/api/TwoFactorAuthentication/send-two-factor-auth-code-for-login/{id}`
- `POST` `/api/TwoFactorAuthentication/set-preferred-two-factor-auth-method/{id}`
- `POST` `/api/TwoFactorAuthentication/verify-two-factor-auth-code`
- `POST` `/api/TwoFactorAuthentication/verify-two-factor-auth-for-login`

## User
- `POST` `/api/User/admin-users-list-search`
- `GET` `/api/User/can-view-user-list-for-user/{id}`
- `GET` `/api/user/clear-user-cache`
- `POST` `/api/User/confirm-account`
- `DELETE` `/api/User/delete-user-note/{id}`
- `POST` `/api/User/end-impersonation`
- `GET` `/api/User/force-logout/{id}`
- `GET` `/api/User/get-allowed-location-groups/{id}`
- `GET` `/api/User/get-batch-user-update-archive-data/{id}`
- `GET` `/api/User/get-chapterspot-user-retrieval-query/{id}`
- `GET` `/api/User/get-external-user-data-counts`
- `GET` `/api/User/get-external-user-processing-info-details/{id}`
- `GET` `/api/User/get-hubspot-user-retrieval-search-request/{id}/{param2}`
- `GET` `/api/User/get-ilt-instructors`
- `GET` `/api/User/get-security-questions/{id}`
- `GET` `/api/User/get-user-audit-data/{id}`
- `GET` `/api/User/get-user-change-log/{id}`
- `GET` `/api/User/get-user-change-log-fields`
- `GET` `/api/User/get-user-display-name/{id}`
- `GET` `/api/User/get-user-from-chapterspot-by-first-last-name/{id}/{param2}/{param3}`
- `GET` `/api/User/get-user-from-chapterspot-by-username/{id}/{param2}`
- `GET` `/api/User/get-user-from-hubspot-by-first-last-name/{id}/{param2}/{param3}`
- `GET` `/api/User/get-user-from-hubspot-by-username/{id}/{param2}`
- `GET` `/api/User/get-user-note/{id}`
- `GET` `/api/User/get-user-notes/{id}`
- `GET` `/api/User/get-user-relationship-tree/{id}`
- `GET` `/api/User/get-user-relationship-types-for-user/{id}`
- `GET` `/api/User/get-user-relationship-types-for-user-profile`
- `GET` `/api/User/get-user-security/{id}`
- `GET` `/api/User/get-users-simple`
- `POST` `/api/User/merge-user-accounts`
- `POST` `/api/User/post-my-profile-user`
- `POST` `/api/User/post-user-note`
- `POST` `/api/User/post-user-security`
- `POST` `/api/User/resolve-external-user-processing-info-details`
- `POST` `/api/User/retry-then-resolve-external-user-processing-info-details`
- `GET` `/api/User/scorm-dispatch-authenticate`
- `POST` `/api/User/send-magic-login-link`
- `POST` `/api/User/update-security-question-answers`
- `POST` `/api/User/userresetpassword`
- `POST` `/api/User/verify-user-password`

## UserContentEvent
- `POST` `/api/UserContentEvent/get-user-content-events`
- `GET` `/api/UserContentEvent/get-user-content-event-subscriptions`
- `GET` `/api/UserContentEvent/get-user-content-event-types`
- `POST` `/api/UserContentEvent/save-user-content-event-subscriptions`

## UserContentTrackingMisc
- `POST` `/api/UserContentTrackingMisc/archive-content-tracking-misc/{id}`
- `POST` `/api/UserContentTrackingMisc/archive-many-content-tracking-miscs`
- `POST` `/api/UserContentTrackingMisc/create-content-tracking-misc-for-contents`
- `POST` `/api/UserContentTrackingMisc/create-many-content-tracking-misc-for-content`
- `POST` `/api/UserContentTrackingMisc/delete-many-content-tracking-miscs`
- `GET` `/api/UserContentTrackingMisc/get-certificate-only-statuses`
- `GET` `/api/UserContentTrackingMisc/get-content-tracking-misc/{id}`
- `GET` `/api/UserContentTrackingMisc/get-exam-only-statuses`
- `GET` `/api/UserContentTrackingMisc/get-survey-only-statuses`
- `POST` `/api/UserContentTrackingMisc/update-content-tracking-status/{id}`

## Utility
- `POST` `/api/Utility/log-page-usage`
- `DELETE` `/api/Utility/remove-text-editor-image/{id}`
- `POST` `/api/Utility/save-text-editor-image`

## WebMeetingIntegration
- `GET` `/api/WebMeetingIntegration/get-integration-users/{id}`

## xAPI (LRS)
- `DELETE` `xapi/activities/delete-for-client`
- `DELETE` `xapi/activities/profile/delete-for-client`
- `DELETE` `xapi/activities/state/delete-for-client`
- `DELETE` `xapi/agents/delete-for-client`
- `DELETE` `xapi/agents/profile/delete-for-client`
- `DELETE` `xapi/lrs/verbs/delete-for-client`
- `DELETE` `xapi/statements/delete-for-client`
- `DELETE` `xapi/statements/delete-for-registrationBADBADBAD?registrationId={id}`
- `DELETE` `xapi/activities/state/delete-for-registration?registrationId={id}`
- `GET` `xapi/lrs/get-activities-for-lrs-viewer?activityId={activityId}`
- `GET` `xapi/lrs/get-activity-profiles-for-lrs-viewer?activityId={activityId}&profileId={profileId}&since={since}`
- `GET` `xapi/lrs/get-activity-states-for-lrs-viewer?activityId={activityId}&agent={agent}&stateId={stateId}&registration={registration}&since={since}`
- `GET` `xapi/lrs/get-agent-profiles-for-lrs-viewer?agent={agent}&profileId={profileId}&since={since}`
- `GET` `xapi/lrs/get-agents-for-lrs-viewer?agent={agent}`
- `GET` `xapi/lrs/get-client-basic-authorization`
- `GET` `xapi/lrs/get-errors-for-lrs-viewer`
- `GET` `xapi/lrs/get-result-formats`
- `GET` `xapi/lrs/get-verbs`
- `GET` `xapi/lrs/is-client-subscribed-to-lrs`
- `POST` `xapi/lrs/subscribe-client-to-lrs?name={name}&userName={userName}&password={password}&clientUrl={clientUrl}`
- `POST` `xapi/lrs/unsubscribe-client-from-lrs`
