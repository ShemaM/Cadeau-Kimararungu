// File: index.js
// Description: This script initializes various components of a web page including AOS animations, tooltips, charts, and scroll effects.

        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Animate stats numbers
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        const statsNumbers = document.querySelectorAll('.stats-number');
        statsNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            animateValue(number, 0, target, 2000);
        });
        
        // Charts
        document.addEventListener('DOMContentLoaded', function() {
            // Research Methods Chart
            const methodsCtx = document.getElementById('researchMethodsChart').getContext('2d');
            const methodsChart = new Chart(methodsCtx, {
                type: 'radar',
                data: {
                    labels: ['Survey Design', 'Ethnography', 'Interviews', 'Focus Groups', 'Policy Analysis', 'Data Visualization'],
                    datasets: [{
                        label: 'Method Expertise',
                        data: [85, 90, 95, 80, 75, 70],
                        backgroundColor: 'rgba(44, 95, 45, 0.2)',
                        borderColor: 'rgba(44, 95, 45, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(44, 95, 45, 1)',
                        pointRadius: 4
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Research Method Expertise',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            });
            
            // Region Expertise Chart
            const regionCtx = document.getElementById('regionExpertiseChart').getContext('2d');
            const regionChart = new Chart(regionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Great Lakes', 'East Africa', 'Horn of Africa', 'Southern Africa', 'West Africa'],
                    datasets: [{
                        data: [45, 30, 15, 5, 5],
                        backgroundColor: [
                            'rgba(44, 95, 45, 0.8)',
                            'rgba(58, 125, 68, 0.8)',
                            'rgba(151, 188, 98, 0.8)',
                            'rgba(200, 214, 162, 0.8)',
                            'rgba(233, 241, 223, 0.8)'
                        ],
                        borderColor: [
                            'rgba(44, 95, 45, 1)',
                            'rgba(58, 125, 68, 1)',
                            'rgba(151, 188, 98, 1)',
                            'rgba(200, 214, 162, 1)',
                            'rgba(233, 241, 223, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        title: {
                            display: true,
                            text: 'Regional Expertise Distribution',
                            font: {
                                size: 16
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
            
            // Impact Chart
            const impactCtx = document.getElementById('impactChart').getContext('2d');
            const impactChart = new Chart(impactCtx, {
                type: 'bar',
                data: {
                    labels: ['GRD', 'Samuel Hall', 'Oxford', 'HIAS', 'UNDP'],
                    datasets: [{
                        label: 'Policy Impact',
                        data: [85, 75, 90, 60, 80],
                        backgroundColor: 'rgba(44, 95, 45, 0.7)',
                        borderColor: 'rgba(44, 95, 45, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Community Impact',
                        data: [80, 90, 70, 85, 75],
                        backgroundColor: 'rgba(151, 188, 98, 0.7)',
                        borderColor: 'rgba(151, 188, 98, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Research Impact by Organization',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                }
                            }
                        }
                    }
                }
            });
        });
    