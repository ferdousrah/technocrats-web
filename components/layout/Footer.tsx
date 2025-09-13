export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Technocrats</h3>
            <p className="text-gray-300 mb-4">
              Leading software development company since 2014. We deliver custom solutions, 
              mobile apps, AI/ML, and enterprise software for corporates & governments.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Custom Software Development</li>
              <li>Mobile App Development</li>
              <li>AI & Machine Learning</li>
              <li>Enterprise Solutions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>info@technocrats.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Tech Street</li>
              <li>San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Technocrats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}