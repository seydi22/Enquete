import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({ href, children }) => (
    <a href={href} className="text-text-secondary hover:text-primary transition-colors">
      {children}
    </a>
  );

  return (
    <footer className="bg-neutral-lightest border-t border-neutral-light">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm text-text-secondary">
              &copy; {currentYear} Data Rapports. Tous droits réservés.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <SocialLink href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-1.4 1.2-3.6 2.3-5.5 2.8.3 2.4-1.3 4.5-3.5 5.2-2.2.7-4.5-.4-5.5-2.2-.9 1.8-3.2 2.9-5.2 2.4-2-.5-3.5-2-4-4 .5-1.7 2.2-3.3 4-4.2-1.2-1.4-2.2-3-2.5-4.5.8-1.7 3.2-2.8 5-2.2.7 2.2 3.4 3.9 5.5 4.2 1.2-1.7 2.9-3.3 4.5-4z"/></svg>
            </SocialLink>
            <SocialLink href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </SocialLink>
            <SocialLink href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
