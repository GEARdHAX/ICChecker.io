export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} ICChecker.io. All rights reserved.</p>
                <p className="text-sm">A demonstration project for BEL.</p>
            </div>
        </footer>
    );
}