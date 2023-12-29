import { StyleSheet } from "react-native";
// for Welcome Page
export const welcome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});


// for Signin + signup
export const user = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },  
    iconContainer: {
      position: 'absolute',
      right: 10,
    }, 
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 15,
    },
    ButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
     
    signUpLink: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
    },
    clickHere: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });
  

//  for Navbar
export const navbar = StyleSheet.create({
    navbar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: "#A0AEC0" // This is a gray color, you might need to adjust it to match the exact tone of 'bg-gray-400'
    },
    logoAndTitle: {
      flexDirection: "row",
      alignItems: "center"
    },
    text: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    title: {
      marginLeft: 8
    },
    icons: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconText: {
      color: "white",
      fontSize: 20,
      marginRight: 16
    }
  });
  

//  for Complaint Type
export const Type = StyleSheet.create({
    container: {
      flexDirection: 'row', // equivalent to 'flex-row'
      alignItems: 'center', // equivalent to 'items-center'
      justifyContent: 'space-between', // equivalent to 'justify-between'
      marginHorizontal: 16, // equivalent to 'mx-4'
      padding: 16, // equivalent to 'p-4'
      backgroundColor: '#60a5fa', // equivalent to 'bg-blue-400'
      borderRadius: 9999, // equivalent to 'rounded-full'
      marginTop: 32, // equivalent to 'mt-8'
    },
    text: {
      color: 'black', // equivalent to 'text-black'
      fontSize: 18, // equivalent to 'text-lg'
    },
    divider: {
      borderRightWidth: 1,
      borderRightColor: 'black', // equivalent to 'border-r border-black'
      height: 32, // equivalent to 'h-8'
    },
    icon: {
      color: 'white', // equivalent to 'text-white'
      fontSize: 18, // equivalent to 'text-lg'
    },
    footerText: {
      color: 'black', // equivalent to 'text-black'
      fontSize: 18, // equivalent to 'text-lg'
      fontWeight: 'bold', // equivalent to 'font-bold'
      textAlign: 'center', // equivalent to 'text-center'
      paddingVertical: 24, // equivalent to 'p-6'
    },
  });
  

// styling for ClosedComplaint + Initiated Complaint + InprogressComplaint + SingleComplaint
export const ComplaintStages = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cbd5e1',
    borderRadius: 10,
    // overflow: 'hidden',
    width:400,
    height:200,
    marginBottom:10,
  },
  closedIndicator: {
    width: 6,
    backgroundColor: '#EE1212',  // for closed
    height: '100%', // Makes the line stretch to the height of the container
  },
  initiatedIndicator: {
    width: 6,
    backgroundColor: '#BDAB04', // for initiated
    height: '100%', // Makes the line stretch to the height of the container
  },
  inProgressIndicator: {
    width: 6,
    backgroundColor: '#35A5E4',
    height: '100%', // Makes the line stretch to the height of the container
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  complaintName: {
    fontSize: 20,
    color: '#333',
  },
  otherInfo: {
    fontSize: 16,
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
  },
});
// styling for ComplaintBox
export const box = StyleSheet.create({
    container: {
      borderRadius: 8, // equivalent to 'rounded-lg'
      backgroundColor: '#cbd5e1', // equivalent to 'bg-slate-300'
      width: 160, // equivalent to 'w-40'
      marginHorizontal: 20, // equivalent to 'mx-5'
      marginTop: 8, // equivalent to 'my-2'
      marginBottom: 8,
    },
    image: {
      width: 160, // equivalent to 'w-40'
      borderRadius: 8, // equivalent to 'rounded-lg'
      height: 80, // equivalent to 'h-20'
      marginBottom: 4, // equivalent to 'mb-1'
    },
    complaintName: {
      fontSize: 18, // equivalent to 'text-lg'
      textAlign: 'center', // equivalent to 'text-center'
      fontWeight: 'bold', // equivalent to 'font-bold'
      marginBottom: 4, // equivalent to 'mb-1'
    },
    otherInfo: {
      fontSize: 14, // equivalent to 'text-sm'
      textAlign: 'center', // equivalent to 'text-center'
    },
  });
  
// for Pending Complaint + Recieved Complaint
export const Pending = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

//   for complaintTracking
export const Tracking = StyleSheet.create({
    textbox:{
        backgroundColor: '#3498db', // You can change the background color as needed
        borderRadius: 10, // Adjust the border radius as needed
        padding: 0, // Adjust the padding as needed
        alignItems: 'center',
        marginHorizontal:  90,
        marginVertical:30,
        alignItems: 'center',
      },
      textContainer: {
        // flex: 1,
        padding: 10,
        textAlign: 'center',
        // marginTop: 20,
        fontSize:20, 
        // justifyContent: 'center',
        color:'white',
      },
});