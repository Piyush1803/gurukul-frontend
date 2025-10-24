import { motion } from "framer-motion";
import { Heart, Clock, Users, Award } from "lucide-react";

export const About = () => {
  const timeline = [
    { year: "2012", event: "Founded by Chef Priyanka Kumar" },
    { year: "2015", event: "Opened our first baking school" },
    { year: "2018", event: "Expanded to include Gurukul courses" },
    { year: "2022", event: "Celebrating 10 years of excellence" },
    { year: "2025", event: "Launched online ordering platform" }
  ];

  const stats = [
    { icon: Clock, number: "13+", label: "Years of Experience" },
    { icon: Users, number: "10K+", label: "Students Taught" },
    { icon: Heart, number: "1M+", label: "Happy Customers" },
    { icon: Award, number: "5+", label: "Awards Won" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four decades of passion, tradition, and excellence in the art of baking
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-serif font-bold text-center mb-12"
            >
              Where Tradition Meets Innovation
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="prose prose-lg max-w-none text-muted-foreground"
            >
              <p className="text-xl leading-relaxed mb-6">
                Founded in 2012 by Chef Priyanka Kumar, Gurukul Bakery began as a small 
                neighborhood shop with a simple mission: to bring the authentic taste of 
                Punjab baking to our community.
              </p>
              
              <p className="text-xl leading-relaxed mb-6">
                What started with just a handful of traditional recipes has grown into a 
                beloved institution that serves thousands of customers daily while maintaining 
                the same commitment to quality and craftsmanship that defined our early days.
              </p>
              
              <p className="text-xl leading-relaxed">
                Today, we're proud to share our knowledge through comprehensive baking courses, 
                ensuring that the art of traditional baking continues to thrive for future 
                generations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-16"
          >
            Our Journey
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <div className={`bg-background p-6 rounded-2xl shadow-soft max-w-md ${
                    index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'
                  }`}>
                    <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-soft"
                />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-gradient-warm shadow-soft hover:shadow-warm transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4"
                >
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-serif font-bold mb-8">Our Mission</h2>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              To preserve the artisan tradition of baking while inspiring the next generation 
              of bakers through exceptional education, premium ingredients, and unwavering 
              commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};