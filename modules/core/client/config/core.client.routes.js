'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise('not-found');
        // Home state routing
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'content': {
                        template: '<div ui-view></div>',
                        controller: function($state, Authentication) {

                            // if user is an admin route to their home page
                            if (Authentication.user.roles === 'admin') {
                                $state.go('auxOverview');
                            }
                            // otherwise if they are a user, route to that homepage
                            else if (Authentication.user.roles === 'user') {
                                $state.go('vetHomepage');
                            }
                            //otherwise just go to the signin page, no one is signed in
                            else {
                                $state.go('signin');
                            }
                        }
                    }
                }
            })

            .state('not-found', {
                url: '/not-found',
                views: {
                    'content': {
                        templateUrl: 'modules/core/views/404.client.view.html'
                    }
                }
            })
            .state('overview', {
                url: '/overview',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/patients/views/overview.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('progressForms', {
                url: '/progressForms',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/progressForms.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('enrollmentForm', {
                url: '/enrollmentForm',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/enrollmentForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('vetFeedback', {
                url: '/vetFeedback',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/feedbackForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('exitForm', {
                url: '/exitForm',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/exitForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('vetHomepage', {
                url: '/vetHome',
                views: {
                    'content': {
                        templateUrl: 'modules/practices/views/vetHomepage.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })

            // begin adding new states from users routes folder
            .state('settings', {
                abstract: true,
                url: '/settings',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/settings.client.view.html'
                    }
                },
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('settings.profile', {
                url: '/profile',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
                    }
                }
            })
            .state('settings.password', {
                url: '/password',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/change-password.client.view.html'
                    }
                }
            })
            .state('settings.accounts', {
                url: '/accounts',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html'
                    }
                }
            })
            .state('settings.picture', {
                url: '/picture',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html'
                    }
                }
            })
            .state('signup', {
                url: '/signup',

                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/users/views/authentication/signup.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('signin', {
                url: '/signin?err',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/authentication/signin.client.view.html'
                    }
                }
            })

            // getting rid of this abstract state makes life easier
            // now we can access the forgot password page, state is defined right below these comments
            // .state('password', {
            //   abstract: true,
            //   url: '/password',
            //   template: '<ui-view/>'
            // })
            // this is for the forgot password state, got rid of password. abstract state
            // should go ahead and modify the rest of the abstract state stuff as well!
            .state('forgot', {
                url: '/forgot',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
                    }
                }
            })
            .state('password.reset', {
                abstract: true,
                url: '/reset',
                template: '<ui-view/>'
            })
            .state('password.reset.invalid', {
                url: '/invalid',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
                    }
                }
            })
            .state('password.reset.success', {
                url: '/success',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
                    }
                }
            })
            .state('password.reset.form', {
                url: '/:token',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password.client.view.html'
                    }
                }
            })

            //begin adding routes for AuxThera view
            .state('auxOverview', {
                url: '/auxOverview',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxOverview.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxFeedback', {
                url: '/auxFeedback',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxFeedback.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxCallList', {
                url: '/auxCallList',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxCallList.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxUpdates', {
                url: '/auxUpdates',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxUpdates.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
    }
]);