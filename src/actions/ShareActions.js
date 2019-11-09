import {Share} from 'react-native';

export const OnShare = (message, url, title) =>{
    console.log(title);
    var a = Share.share({
        message: "A complete guide on how to tie a tie. From the Full Windsor and Four-in-Hand to the Granchester and Bow Tie, mastering these 8 popular tie knots will help take your smart looks to the next level\
        \n\
        http://flip.it/kmxflh\n\
        \n\
        \nSent via Flipboard, your personal magazine. \
        \nGet it for free to keep up with the news you care about.",
        url: url,
        title: title
    }, {
            // Android only:
            dialogTitle: title,
            // iOS only:
            excludedActivityTypes: [
                // 'com.apple.UIKit.activity.PostToTwitter'
            ]
        }).then(({ action, activityType }) => {
            if (action === Share.dismissedAction)
                console.log('Share dismissed');
            else
                console.log('Share successful');
        })
}

