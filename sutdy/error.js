/**
 * Created by Administrator on 14-7-10.
 */
process.on('uncaughtException', function ( err ) {
    console.error(err);
    console.error('An uncaughtException was found, the program will end.');
    //hopefully do some logging.
    process.exit(1);
});

try
{
    //throw new Error('who will catch me?');
    setTimeout(function () {
        throw new Error('who will catch me?');
    }, 1);
}
catch (e) {
    console.log('not me==========================================');
}

