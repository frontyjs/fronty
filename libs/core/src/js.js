export const js = ({ container, onMount = () => {}, app, fronty }) => {
	onMount({ container, fronty, app });
};
