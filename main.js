// 主要JavaScript功能
class LuxuryWebsite {
    constructor() {
        this.currentFilter = {
            brand: 'all',
            size: 'all',
            price: 'all',
            color: 'all'
        };
        this.products = this.initializeProducts();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.preloadImages();
    }

    // 初始化产品数据
    initializeProducts() {
        return [
            {
                id: 1,
                title: "经典款手提包",
                subtitle: "Premium Leather",
                brand: "hermes",
                size: "medium",
                price: "high",
                color: "black",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
                featured: true
            },
            {
                id: 2,
                title: "奢华单肩包",
                subtitle: "Designer Collection",
                brand: "chanel",
                size: "small",
                price: "high",
                color: "black",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
                featured: true
            },
            {
                id: 3,
                title: "精致迷你包",
                subtitle: "Limited Edition",
                brand: "louis-vuitton",
                size: "mini",
                price: "medium",
                color: "brown",
                image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
                featured: false
            },
            {
                id: 4,
                title: "商务手提包",
                subtitle: "Professional Series",
                brand: "gucci",
                size: "large",
                price: "high",
                color: "black",
                image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop",
                featured: false
            },
            {
                id: 5,
                title: "时尚斜挎包",
                subtitle: "Street Style",
                brand: "prada",
                size: "small",
                price: "medium",
                color: "white",
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
                featured: true
            },
            {
                id: 6,
                title: "复古手拿包",
                subtitle: "Vintage Collection",
                brand: "hermes",
                size: "mini",
                price: "high",
                color: "red",
                image: "https://images.unsplash.com/photo-1564422167509-4f16ecd9e4d9?w=400&h=400&fit=crop",
                featured: false
            }
        ];
    }

    // 设置事件监听器
    setupEventListeners() {
        // Tab切换
        document.getElementById('bagsTab')?.addEventListener('click', () => this.switchTab('bags'));
        document.getElementById('jewelryTab')?.addEventListener('click', () => this.switchTab('jewelry'));

        // 筛选器
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => this.handleFilterChange(e));
        });

        // 搜索功能
        this.setupSearch();

        // 滚动事件
        window.addEventListener('scroll', () => this.handleScroll());

        // 窗口大小变化
        window.addEventListener('resize', () => this.handleResize());
    }

    // Tab切换功能
    switchTab(tab) {
        const bagsTab = document.getElementById('bagsTab');
        const jewelryTab = document.getElementById('jewelryTab');
        const filtersSection = document.getElementById('filtersSection');
        const productsSection = document.getElementById('productsSection');
        const comingSoonSection = document.getElementById('comingSoonSection');

        if (tab === 'bags') {
            bagsTab?.classList.add('active');
            jewelryTab?.classList.remove('active');
            filtersSection?.classList.remove('hidden');
            productsSection?.classList.remove('hidden');
            comingSoonSection?.classList.add('hidden');
            this.animateProductsIn();
        } else {
            jewelryTab?.classList.add('active');
            bagsTab?.classList.remove('active');
            filtersSection?.classList.add('hidden');
            productsSection?.classList.add('hidden');
            comingSoonSection?.classList.remove('hidden');
        }
    }

    // 筛选功能
    handleFilterChange(event) {
        const filterType = event.target.closest('div').querySelector('label').textContent.trim();
        const value = event.target.value;

        // 更新筛选状态
        switch(filterType) {
            case '品牌':
                this.currentFilter.brand = value;
                break;
            case '尺寸':
                this.currentFilter.size = value;
                break;
            case '价格':
                this.currentFilter.price = value;
                break;
            case '颜色':
                this.currentFilter.color = value;
                break;
        }

        this.filterProducts();
    }

    // 过滤产品
    filterProducts() {
        const filteredProducts = this.products.filter(product => {
            return (this.currentFilter.brand === 'all' || this.currentFilter.brand === '全部品牌' || 
                    product.brand === this.currentFilter.brand.toLowerCase().replace('é', 'e')) &&
                   (this.currentFilter.size === 'all' || this.currentFilter.size === '全部尺寸' || 
                    product.size === this.currentFilter.size.toLowerCase()) &&
                   (this.currentFilter.price === 'all' || this.currentFilter.price === '全部价格' || 
                    this.matchesPrice(product.price, this.currentFilter.price)) &&
                   (this.currentFilter.color === 'all' || this.currentFilter.color === '全部颜色' || 
                    product.color === this.currentFilter.color);
        });

        this.renderProducts(filteredProducts);
    }

    // 价格匹配
    matchesPrice(productPrice, filterPrice) {
        if (filterPrice.includes('$1000 - $5000')) {
            return productPrice === 'medium';
        } else if (filterPrice.includes('$5000 - $10000') || filterPrice.includes('$10000+')) {
            return productPrice === 'high';
        }
        return true;
    }

    // 渲染产品
    renderProducts(products) {
        const container = document.querySelector('#productsSection .grid');
        if (!container) return;

        // 添加加载动画
        container.innerHTML = '<div class="col-span-full text-center py-8"><div class="loading mx-auto"></div></div>';

        setTimeout(() => {
            container.innerHTML = products.map(product => `
                <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-all duration-300 fade-in" onclick="goToProduct(${product.id})">
                    <div class="aspect-square bg-gray-100 relative overflow-hidden">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                        <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm">
                            <i class="fas fa-heart text-gray-400 hover:text-red-500 transition-colors cursor-pointer"></i>
                        </div>
                        ${product.featured ? '<div class="absolute top-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">热销</div>' : ''}
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-1">${product.title}</h3>
                        <p class="text-gray-500 text-sm mb-2">${product.subtitle}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-gray-900">？？？</span>
                            <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                                <i class="fab fa-whatsapp mr-1"></i>联系
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            // 重新应用滚动动画
            this.setupScrollAnimations();
        }, 500);
    }

    // 搜索功能
    setupSearch() {
        // 可以在这里添加搜索框和搜索功能
        let searchTimeout;
        
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                this.showSearchModal();
            }
        });
    }

    // 显示搜索模态框
    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-6 w-96 max-w-full mx-4">
                <h3 class="text-lg font-semibold mb-4">搜索产品</h3>
                <input type="text" placeholder="输入产品名称..." class="w-full p-3 border rounded-lg mb-4" id="searchInput">
                <div class="flex justify-end space-x-2">
                    <button class="px-4 py-2 text-gray-600 hover:text-gray-800" onclick="this.closest('.fixed').remove()">取消</button>
                    <button class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onclick="this.searchProducts()">搜索</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('#searchInput').focus();
        
        // ESC键关闭
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }

    // 滚动动画
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.product-card, .fade-in').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // 处理滚动事件
    handleScroll() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // 头部阴影效果
        const header = document.querySelector('header');
        if (scrolled > 10) {
            header?.classList.add('shadow-lg');
        } else {
            header?.classList.remove('shadow-lg');
        }
    }

    // 移动端菜单
    setupMobileMenu() {
        const menuButton = document.querySelector('.md\\:hidden button');
        if (menuButton) {
            menuButton.addEventListener('click', this.toggleMobileMenu);
        }
    }

    toggleMobileMenu() {
        // 实现移动端菜单切换
        console.log('Mobile menu toggled');
    }

    // 窗口大小变化处理
    handleResize() {
        // 响应式处理
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    // 预加载图片
    preloadImages() {
        this.products.forEach(product => {
            const img = new Image();
            img.src = product.image;
        });
    }

    // 产品动画
    animateProductsIn() {
        const products = document.querySelectorAll('.product-card');
        products.forEach((product, index) => {
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// 全局函数
function goToProduct(id) {
    // 添加页面转场动画
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        window.location.href = `product-detail.html?id=${id}`;
    }, 200);
}

// WhatsApp联系功能
function contactWhatsApp(productTitle = '') {
    const message = productTitle ? 
        `你好！我对这个产品很感兴趣：${productTitle}，请提供更多详细信息和价格。` :
        `你好！我想了解更多关于您的产品信息。`;
    
    const whatsappNumber = "1234567890"; // 替换为实际的WhatsApp号码
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化网站
    const website = new LuxuryWebsite();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // 服务工作者注册（用于PWA）
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('网站错误:', e.error);
});

// 导出类供其他脚本使用
window.LuxuryWebsite = LuxuryWebsite;
