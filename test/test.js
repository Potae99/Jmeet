module.exports.auth =  (key = '', valueArr = []) => {

    return async (req, res, next) => {
      
      const authorizationHeaader = req.headers.authorization;
      if (!authorizationHeaader) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }
  
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  
      let result;
  
      try {
        result = jwt.verify(token, jwtConfig.secret);   
        // console.log('result',result);  
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Authorize failed'
        });
      }
      
      req.user = result;
      // console.log('result.role ------->',result.role);
      
      if (result.role == 1 || result.role == 2 || result.role == 3 || result.role == 4) {
        return next();
      }
      
      let proove_counter = 0;
  
      // console.log('req.user.id-----------_>',req.user.id);
      let user = await userModel.findOne({ where: {UserID: req.user.id} });
      // console.log('user-----------_>',JSON.parse(JSON.stringify(user)));
      
  
      if ( !user ) {
        return res.status(401).json({
          success: false,
          message: 'Wrong account'
        });
      }
  
      if ( !user.Active ) {
        return res.status(401).json({
          success: false,
          message: "Can't access because your account has been suspended."
        });
      }
  
  
      for (let i=0;i<valueArr.length;i++) {
  
        if ( typeof(user.permission[key]) != "undefined" ) {
          if ( typeof(user.permission[key][valueArr[i]]) != "undefined" ) {
            if ( user.permission[key][valueArr[i]] )
              proove_counter++; 
          }
        }
  
  
      }
        
      if ( proove_counter != valueArr.length ) { 
        return res.status(200).json({
          success: false,
          message: 'Permission denied.'
        });
      }
  
      return next();
  
    }
  
  }