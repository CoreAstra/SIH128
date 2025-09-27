// Test the signup API endpoint
const testSignup = async () => {
  try {
    console.log('🧪 Testing signup API endpoint...');
    
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpass123',
      phone: '9876543210',
      city: 'Test City'
    };
    
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    
    const data = await response.json();
    
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Signup API is working correctly!');
      
      // Now test login
      console.log('\n🧪 Testing login API endpoint...');
      
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        }),
      });
      
      const loginData = await loginResponse.json();
      
      console.log('📊 Login Response Status:', loginResponse.status);
      console.log('📋 Login Response Data:', JSON.stringify(loginData, null, 2));
      
      if (loginResponse.ok) {
        console.log('✅ Login API is working correctly!');
      } else {
        console.log('❌ Login API failed');
      }
      
    } else {
      console.log('❌ Signup API failed');
    }
    
  } catch (error) {
    console.error('🚨 Network Error:', error.message);
  }
};

// Run the test
testSignup();