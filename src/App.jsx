import AppRoutes from './routes/app-routes'
import { AuthProvider } from '@/features/auth/contexts/AuthContext'
function App() {
	return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App
