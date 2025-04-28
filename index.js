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
    
        //Leflet.js Map
        // Initialize the map
var map = L.map('map').setView([-1.2921, 36.8219], 5); // Centered around Nairobi

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Define countries in Great Lakes + EAC Region
var countries = [
  { name: "Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "Uganda", lat: 0.3476, lng: 32.5825 },
  { name: "Tanzania", lat: -6.7924, lng: 39.2083 },
  { name: "Rwanda", lat: -1.9441, lng: 30.0619 },
  { name: "Burundi", lat: -3.3731, lng: 29.9189 },
  { name: "DR Congo", lat: -4.4419, lng: 15.2663 },
  { name: "South Sudan", lat: 4.8594, lng: 31.5713 },
  { name: "Somalia", lat: 2.0469, lng: 45.3182 }
];

// Add markers with popups
countries.forEach(function(country) {
  L.marker([country.lat, country.lng])
    .addTo(map)
    .bindPopup('<b>' + country.name + '</b>')
    .openPopup();
});

// Research Skills Radar Chart
const researchSkillsCtx = document.getElementById('researchSkillsChart').getContext('2d');
const researchSkillsChart = new Chart(researchSkillsCtx, {
    type: 'radar',
    data: {
        labels: [
            'Research Design', 
            'Survey Design',
            'Ethnographic Research',
            'Focus Groups',
            'Interviews',
            'Statistical Analysis',
            'Policy Analysis',
            'Data Visualization'
        ],
        datasets: [{
            label: 'Proficiency Level',
            data: [90, 85, 80, 75, 85, 80, 90, 75],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        }]
    },
    options: {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

// Alternative: Vector Map Implementation (using jVectorMap)
$(document).ready(function() {
    $('#africaMap').vectorMap({
        map: 'africa_mill',
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#d9dcd6',
                stroke: '#fff',
                "stroke-width": 1,
                "stroke-opacity": 1
            },
            hover: {
                fill: '#3a7ca5',
                cursor: 'pointer'
            }
        },
        onRegionClick: function(event, code) {
            // Handle country click if needed
        },
        selectedRegions: ['KE', 'UG', 'TZ', 'RW', 'CD', 'SS'] // Highlighted countries
    });
});


 $(document).ready(function() {
        $('#interactiveMap').show().vectorMap({
            map: 'africa_en',
            backgroundColor: '#f8f9fa',
            regionStyle: {
                initial: {
                    fill: '#d9dcd6',
                    stroke: '#fff',
                    "stroke-width": 1
                },
                hover: {
                    fill: '#a3bac3'
                }
            },
            selectedRegions: ['KE', 'TZ', 'UG', 'RW', 'SS', 'CD'], // Country codes
            onRegionClick: function(event, code) {
                // Handle click events if needed
            }
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        // Initialize map centered on East Africa
        const map = L.map('map').setView([-1.5, 30], 6);
        
        // Add base tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Define your expertise regions (coordinates simplified for example)
        const expertiseAreas = {
            "Primary Focus": {
                color: "#3a7ca5",
                countries: [
                    {name: "Kenya", coords: [[5.5, 34], [5.5, 42], [-4.5, 42], [-4.5, 34]]},
                    {name: "Uganda", coords: [[-1.5, 29.5], [-1.5, 35], [4.5, 35], [4.5, 29.5]]},
                    {name: "Rwanda", coords: [[-2.5, 29], [-2.5, 30.5], [-1, 30.5], [-1, 29]]}
                ]
            },
            "Secondary Experience": {
                color: "#d9dcd6",
                countries: [
                    {name: "Tanzania", coords: [[-12, 29], [-12, 40], [-1, 40], [-1, 29]]},
                    {name: "DR Congo (East)", coords: [[-14, 29], [-14, 31], [5.5, 31], [5.5, 29]]}
                ]
            }
        };
        
        // Add regions to map
        Object.entries(expertiseAreas).forEach(([category, data]) => {
            data.countries.forEach(country => {
                L.polygon(country.coords, {
                    color: data.color,
                    fillColor: data.color,
                    fillOpacity: 0.7,
                    weight: 1
                }).addTo(map)
                .bindPopup(`<b>${country.name}</b><br>${category}`);
            });
        });
        
        // Add legend
        const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'map-legend');
            let labels = [];
            
            Object.entries(expertiseAreas).forEach(([category, data]) => {
                labels.push(
                    `<i style="background:${data.color}; width:15px; height:15px; display:inline-block; margin-right:5px;"></i> ${category}`
                );
            });
            
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(map);
    });